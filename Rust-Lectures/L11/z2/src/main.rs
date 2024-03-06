fn dig_pow(n: i64, p: i32) -> i64 {
    let res = n.to_string()
        .chars()
        .map(|c| c.to_digit(10).unwrap() as i64)
        .enumerate()
        .fold(0, |acc, (m, k)| acc + k.pow(m as u32 + p as u32));

    match res % n {
        0 => res / n,
        _ => -1,
    }
}

fn main() {
    println!("Hello, world!");
}

fn dotest(n: i64, p: i32, exp: i64) -> () {
    println!(" n: {:?};", n);
    println!("p: {:?};", p);
    let ans = dig_pow(n, p);
    println!(" actual:\n{:?};", ans);
    println!("expect:\n{:?};", exp);
    println!(" {};", ans == exp);
    assert_eq!(ans, exp);
    println!("{};", "-");
}

#[test]
fn basic_test1() {
    dotest(89, 1, 1);
}
#[test]
fn basic_test2() {
    dotest(92, 1, -1);
}
#[test]
fn basic_test3() {
    dotest(46288, 3, 51);
}
#[test]
fn basic_test4() {
    dotest(695, 2, 2);
}
#[test]
fn basic_test5() {
    dotest(1, 1, 1);
}