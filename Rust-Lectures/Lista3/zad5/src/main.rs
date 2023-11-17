fn main() {
    println!("Hello, world!");
}

fn last_digit(str1: &str, str2: &str) -> i32 {
    if str2 == "0"{ return 1;}
  
    let last_str1 = str1.chars()
                             .last()
                             .unwrap()
                             .to_digit(10)
                             .unwrap() as i32;
    
    if last_str1 == 0 || last_str1 == 1 || last_str1 == 5 || last_str1 == 6 {
        last_str1 as i32;
    }

    
    let x;
    if str2.len() >= 2 {
        x = str2[str2.len()-2..].parse::<i32>().unwrap();
    } else {
        x = str2.parse::<i32>().unwrap();
    }
  
    if x % 4 == 0 {
        (last_str1.pow(4 as u32) % 10) as i32
    }
    else {
        (last_str1.pow((x % 4) as u32) % 10) as i32
    }
}

#[test]
fn returns_expected1() {
  assert_eq!(last_digit("4", "1"), 4);
}
#[test]
fn returns_expected2() {

  assert_eq!(last_digit("9", "7"), 9);
}
#[test]
fn returns_expected3() {
  assert_eq!(last_digit("10","10000000000"), 0);
}
#[test]
fn returns_expecte4d() {
  assert_eq!(last_digit("1606938044258990275541962092341162602522202993782792835301376","2037035976334486086268445688409378161051468393665936250636140449354381299763336706183397376"), 6);
}
#[test]
fn returns_expected5() {
  assert_eq!(last_digit("3715290469715693021198967285016729344580685479654510946723", "68819615221552997273737174557165657483427362207517952651"), 7);
}
