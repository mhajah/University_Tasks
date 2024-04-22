from queue import Queue
from enum import Enum 
from dataclasses import dataclass
from typing import *
from collections import defaultdict
from queue import LifoQueue

class Relation(Enum):
    RC = 'RC' # x = row, y = column
    CR = 'CR' # x = column, y = row

class Nonogram:
    def __init__(self, horizontal, vertical):
        self.height = len(horizontal)
        self.width = len(vertical)
        row_domains = []
        col_domains = []
        for row_config in horizontal:
            domain = Nonogram.calculate_domain(row_config, self.width)
            row_domains.append(domain)
        for col_config in vertical:
            domain = Nonogram.calculate_domain(col_config, self.height)
            col_domains.append(domain)
        self.row_domains = row_domains
        self.col_domains = col_domains

        # dla: self.next_block()
        self.entries = [(i, True) for i in range(self.height)] + [(i, False) for i in range(self.width)]

    def calculate_domain(config: List[int], size: int) -> List[str]:
        domain = []
        if sum(config) + len(config) - 1 > size:
            return None
        if len(config) == 0:
            domain.append('.' * size) 
            return domain
        d = config[0]
        for i in range(size-d+1):
            pref = '.' * i + '#' * d
            if len(config) == 1:
                domain.append(pref + '.' * (size - len(pref)))
            else:
                xs = Nonogram.calculate_domain(config[1:], size-len(pref)-1)
                if xs == None:
                    if len(domain) == 0:
                        return None 
                    else:
                        return domain
                for suf in xs:
                    if suf == '':
                        domain.append(pref)
                    else:
                        domain.append(pref + '.' + suf)
        return domain
    

    # klasa uzywana w ac-3, reprezentuje wiaz, ktory jest uzywany
    # aby odrzucic wartosci wiezow, ktore nie moga spelnic tego ograniczenia
    @dataclass
    class Arc:
        idx: int 
        idy: int
        relation: Relation  
    
    # wyszukiwanie konfiguracji w self.*_domains[arc.idx] 
    # ktore nie pasuja do zadnej w self.*_domains[arc.idy] i usuwanie ich
    def revise(self, arc: Arc) -> bool: 
        revised = False 
        domain = self.row_domains[arc.idx] if arc.relation == Relation.RC else self.col_domains[arc.idx]
        counter_domain = self.col_domains[arc.idy] if arc.relation == Relation.RC else self.row_domains[arc.idy]
        new_x = domain
        for xconfig in domain:
            for yconfig in counter_domain:
                if xconfig[arc.idy] == yconfig[arc.idx]:
                    break 
            else:
                revised = True 
                new_x = [cfg for cfg in new_x if cfg[arc.idy] != xconfig[arc.idy]]
        if arc.relation == Relation.RC:
            self.row_domains[arc.idx] = new_x
        else:
            self.col_domains[arc.idx] = new_x
        return revised

    # ac-3, redukcja useless konfiguracji
    def deduct(self) -> None:
        q = Queue(maxsize=0)
        for idx in range(self.width):
            for idy in range(self.height):
                q.put(Nonogram.Arc(idx, idy, Relation.CR))
                q.put(Nonogram.Arc(idy, idx, Relation.RC))
        while not q.empty():
            arc = q.get()
            if self.revise(arc):
                if arc.relation == Relation.RC:
                    for idx in [i for i in range(self.width) if i != arc.idy]:
                        q.put(Nonogram.Arc(idx, arc.idx, Relation.CR))
                else:
                    for idx in [i for i in range(self.height) if i != arc.idy]:
                        q.put(Nonogram.Arc(idx, arc.idx, Relation.RC))

    class Kind(Enum):
        ROW = 'R'
        COLUMN = 'C'

    # uzywane w self.solve(), wybiera nastepne row/column ktore ma zostac rozpatrzone na podstawie dlugosci domeny
    def next_block(self, used: List[Tuple[int, bool]]):
        unused = [entry for entry in self.entries if entry not in used]
        choice = min(unused, key=lambda entry : len(self.row_domains[entry[0]]) if entry[1] else len(self.col_domains[entry[0]]))
        return choice 
    
    # klasa uzywana do przechowywania informacji potrzebnych w trackie powrotu podczas backtracking w self.solve()
    @dataclass
    class State:
        rows: List[List[str]]
        cols: List[List[str]]

    # zwraca kopie self.*_domains 
    def get_rows(self):
        return [domain for domain in self.row_domains]
    def get_cols(self):
        return [domain for domain in self.col_domains]

    # backtracking z dedukcja
    # def solve(self): 
    #     self.deduct()
    #     stack = LifoQueue(maxsize=0)
    #     used = []

    #     # Słownik do śledzenia, która konfiguracja jest aktualnie próbowana w danym wierszu/kolumnie
    #     choice = defaultdict(lambda : -1)

    #     # Stan początkowy dziedzin
    #     stack.put(Nonogram.State(self.get_rows(), self.get_cols()))
    #     while True:
    #         # Stan na ewentualną potrzebe cofnięcia (backtrack)
    #         stack.put(Nonogram.State(self.get_rows(), self.get_cols())) 

    #         # Next row/column
    #         block = self.next_block(used)
    #         idy, is_row = block
    #         #print(f'processing {is_row} #{idy}')

    #         used.append(block) # dodajemy blok do zuzytych

    #         choice[block] = choice[block] + 1
    #         domain = self.row_domains[idy] if is_row else self.col_domains[idy]
    #         if choice[block] >= len(domain):
    #             choice[block] = -1
    #             used = used[:-2]
    #             _ = stack.get() # usuwamy ostatni zapisany stan
    #             revert = stack.get() # Pobieramy poprzedni stan i cofamy się
    #             self.row_domains = revert.rows
    #             self.col_domains = revert.cols
    #             continue

    #         config = self.row_domains[idy][choice[block]] if is_row else self.col_domains[idy][choice[block]]
    #         if is_row:
    #             self.row_domains[idy] = [config]
    #         else:
    #             self.col_domains[idy] = [config]
    #         self.deduct()

    #         if len(min(self.row_domains + self.col_domains, key=lambda domain : len(domain))) == 0:
    #             used = used[:-1]
    #             revert = stack.get()
    #             self.row_domains = revert.rows
    #             self.col_domains = revert.cols
    #             continue 
            
    #         if len(used) == self.height + self.width:
    #             break
        
    #     solution = ''
    #     for [config] in self.row_domains:
    #         solution = solution + config + '\n'
    #     return solution

    def solve(self, used=None, stack=None):
        if used is None:
            used = []
        if stack is None:
            stack = []

        if not stack:
            self.deduct()
            stack.append(Nonogram.State(self.get_rows(), self.get_cols()))

        block = self.next_block(used)
        idy, is_row = block

        domain = self.row_domains[idy] if is_row else self.col_domains[idy]
        for config in domain:
            if is_row:
                self.row_domains[idy] = [config]
            else:
                self.col_domains[idy] = [config]

            stack.append(Nonogram.State(self.get_rows(), self.get_cols()))
            self.deduct()

            if any(len(dom) == 0 for dom in self.row_domains + self.col_domains):
                revert = stack.pop()
                self.row_domains = revert.rows
                self.col_domains = revert.cols
                continue

            used.append(block)
            if len(used) == self.height + self.width:
                return '\n'.join(''.join(config) for [config] in self.row_domains)

            result = self.solve(used, stack)
            if result:
                return result

            # Cofnięcie zmian jeśli rozwiązanie nie jest dalej możliwe
            used.pop()
            revert = stack.pop()
            self.row_domains = revert.rows
            self.col_domains = revert.cols

 
def main():
    with open('zad_input.txt', 'r') as inp, open('zad_output.txt', 'w') as out:
        size = inp.readline()
        height, _ = size.split(' ')
        height = int(height)
        horizontal, vertical = [], []
        for idy, line in enumerate(inp):
            params = list(map(int, line.split(' ')))
            if idy < height:
                horizontal.append(params)
            else:
                vertical.append(params)
        nonogram = Nonogram(horizontal, vertical)
        out.write(nonogram.solve())

if __name__ == '__main__':
    main()