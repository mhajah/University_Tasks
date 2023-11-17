use std::cmp::max;

fn main() {
    println!("{}", zoom(5));
}

fn zoom(n: i32) -> String {
    let filled_square = "■";
    let empty_square = "□";
    let mut res = String::new();
    let center = (n-1)/2;

    for y in 0 .. n {
        for x in 0 .. n {
            //                 maximum z odległości y i x od środka
            let maximum = max((y - center).abs(), (x - center).abs());
            match maximum % 2 
            {
                0 => res += filled_square,
                _ => res += empty_square,
            }
        }
        res += "\n";
    }
    res.pop();
    res
}

#[test]
fn basic_test_1() {
  assert_eq!(zoom(1), "■");
}

#[test]
fn basic_test_2() {
  assert_eq!(zoom(3), "\
□□□
□■□
□□□"
  );
}

#[test]
fn basic_test_3() {
  assert_eq!(zoom(5), "\
■■■■■
■□□□■
■□■□■
■□□□■
■■■■■"
  );
}

#[test]
fn basic_test_4() {
  assert_eq!(zoom(7), "\
□□□□□□□
□■■■■■□
□■□□□■□
□■□■□■□
□■□□□■□
□■■■■■□
□□□□□□□"
  );
}

#[test]
fn basic_test_5() {
  assert_eq!(zoom(9), "\
■■■■■■■■■
■□□□□□□□■
■□■■■■■□■
■□■□□□■□■
■□■□■□■□■
■□■□□□■□■
■□■■■■■□■
■□□□□□□□■
■■■■■■■■■"
  );
}