fn main() {
    println!("Hello, world!");
}    


fn count_bits(n: i64) -> u32 {
    let binary_representation = format!("{:b}", n);
    
    let only_ones = binary_representation.chars().filter(|&c| c == '1');

    let result: u32 = only_ones.count().try_into().unwrap();

    result
}

#[test]
fn returns_expected1() {
    assert_eq!(count_bits(0), 0);

}

#[test]
fn returns_expected2() {
    assert_eq!(count_bits(4), 1);
}

#[test]
fn returns_expected3() {
    assert_eq!(count_bits(7), 3);

}

#[test]
fn returns_expected4() {
    assert_eq!(count_bits(9), 2);
}

#[test]
fn returns_expected5() {
    assert_eq!(count_bits(10), 2);
}