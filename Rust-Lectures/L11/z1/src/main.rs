struct Sudoku{
    data: Vec<Vec<u32>>,
}


impl Sudoku{
    fn is_valid(&self) -> bool {
		let size = self.data.len();
		if (size as f32).sqrt() % 1.0 != 0.0 { return false }

		// Sprawdzenie, czy rozmiar jest OK
		if self.data.iter()
		            .map(|i| i.len() != size)
		            .any(|c| c) { 
                        return false 
                    }

        
        // Przypadek brzegowy
        if size == 1 { return self.data[0][0] == 1 }

        let box_size = (size as f64).sqrt().round() as usize;
        for i in 0..size {
            // Wektory rozmiaru naszego Sudoku
            // Sudoku jest rozwiazane, jesli wszystkie wartosci przestawimy na true
            let mut flatten_column = vec![true; size];
            let mut flatten_row = vec![true; size];
            let mut square = vec![true; size];
            for j in 0..size {
              // Sprawdzenie wierszy i kolumn
              flatten_row[(self.data[j][i] - 1) as usize] = false;
              flatten_column[(self.data[i][j] - 1) as usize] = false;

              // Sprawdzenie wszystkich kwadratów
              let box_x: usize = (i % box_size) * box_size + j % box_size;
              let box_y: usize = (i / box_size) * box_size + j / box_size;
              square[(self.data[box_y][box_x] - 1) as usize] = false;
            }
            let mut results = flatten_column.into_iter()
                                                                        .chain(flatten_row.into_iter())
                                                                        .chain(square.into_iter());
            if results.any(|digit| digit) {
              return false
            }
          }
          true
        }   
}

fn main() {
    let good_sudoku_1 = Sudoku{
        data: vec![
                vec![7,8,4, 1,5,9, 3,2,6],
                vec![5,3,9, 6,7,2, 8,4,1],
                vec![6,1,2, 4,3,8, 7,5,9],

                vec![9,2,8, 7,1,5, 4,6,3],
                vec![3,5,7, 8,4,6, 1,9,2],
                vec![4,6,1, 9,2,3, 5,8,7],
                
                vec![8,7,6, 3,9,4, 2,1,5],
                vec![2,4,3, 5,6,1, 9,7,8],
                vec![1,9,5, 2,8,7, 6,3,4]
            ]
    };

    if(good_sudoku_1.is_valid()) {
        println!("Hello, world!");
    }
}

#[test]
fn good_sudoku() {
    let good_sudoku_1 = Sudoku{
        data: vec![
                vec![7,8,4, 1,5,9, 3,2,6],
                vec![5,3,9, 6,7,2, 8,4,1],
                vec![6,1,2, 4,3,8, 7,5,9],

                vec![9,2,8, 7,1,5, 4,6,3],
                vec![3,5,7, 8,4,6, 1,9,2],
                vec![4,6,1, 9,2,3, 5,8,7],
                
                vec![8,7,6, 3,9,4, 2,1,5],
                vec![2,4,3, 5,6,1, 9,7,8],
                vec![1,9,5, 2,8,7, 6,3,4]
            ]
    };
    
    let good_sudoku_2 = Sudoku{
        data: vec![
                vec![1, 4,  2, 3],
                vec![3, 2,  4, 1],
        
                vec![4, 1,  3, 2],
                vec![2, 3,  1, 4],
            ]
    };

    let good_sudoku_3 = Sudoku{
        data: vec![
                vec![1],
            ]
    };
    assert!(good_sudoku_1.is_valid());
    assert!(good_sudoku_2.is_valid());
    assert!(good_sudoku_3.is_valid());
}

#[test]
fn bad_sudoku() {
    let bad_sudoku_1 = Sudoku{
        data: vec![
                vec![1,2,3, 4,5,6, 7,8,9],
                vec![1,2,3, 4,5,6, 7,8,9],
                vec![1,2,3, 4,5,6, 7,8,9],

                vec![1,2,3, 4,5,6, 7,8,9],
                vec![1,2,3, 4,5,6, 7,8,9],
                vec![1,2,3, 4,5,6, 7,8,9],
                
                vec![1,2,3, 4,5,6, 7,8,9],
                vec![1,2,3, 4,5,6, 7,8,9],
                vec![1,2,3, 4,5,6, 7,8,9],
            ]
    };
    
    let bad_sudoku_2 = Sudoku{
        data: vec![
                vec![1,2,3,4,5],
                vec![1,2,3,4],
                vec![1,2,3,4],
                vec![1],
            ]
    };
    assert!(!bad_sudoku_1.is_valid());
    assert!(!bad_sudoku_2.is_valid());
}
