// 1: 0 (Even)
// 2: 1 (Odd)
// 3: 1 (Odd)
// 4: 2 (Even)
// 5: 4 (Even)
// 6: 8 (Even)
// 7: 16 (Even)
// 8: 31 (Odd)
// 9: 61 (Odd)
// 10: 120 (Even)
// 11: 236 (Even)
// 12: 464 (Even)
// 13: 912 (Even)
// 14: 1793 (Odd)
// 15: 3525 (Odd)
// 16: 6930 (Even)
// 17: 13624 (Even)
// 18: 26784 (Even)
// 19: 52656 (Even)
// 20: 103519 (Odd)
// 21: 203513 (Odd)
// 22: 400096 (Even)
// 23: 786568 (Even)
// 24: 1546352 (Even)
// 25: 3040048 (Even)
// 26: 5976577 (Odd)
// 27: 11749641 (Odd)
// 28: 23099186 (Even)
// 29: 45411804 (Even)
// 30: 89277256 (Even)
// 31: 175514464 (Even)
// 32: 345052351 (Odd)
// 33: 678355061 (Odd)
// 34: 1333610936 (Even)
// 35: 2621810068 (Even)
// 36: 5154342880 (Even)
// 37: 10133171296 (Even)
// 38: 19921290241 (Odd)
// 39: 39164225421 (Odd)
// 40: 76994839906 (Even)

fn main() {
    println!("{}", count_odd_pentafib(3));
}

fn count_odd_pentafib(n: u16) -> u16 {
    let res = 
    match n {
        0 => 0,
        1..=6 => 1,
        _ => {
            n/6 * 2 - 1 + 2
        }
    };

    if n%6 <= 2 && n>2 {
        return res - 2 + n%6
    }
    res
}

#[test]
fn basic_tests1() {
    assert_eq!(count_odd_pentafib(5), 1);
}
#[test]
fn basic_tests2() {
    assert_eq!(count_odd_pentafib(10), 3);
}
#[test]
fn basic_tests3() {
    assert_eq!(count_odd_pentafib(15), 5);
}
#[test]
fn basic_tests4() {
    assert_eq!(count_odd_pentafib(45), 15);
}
#[test]
fn basic_tests5() {
    assert_eq!(count_odd_pentafib(68), 23);
}
#[test]
fn basic_tests6() {
    assert_eq!(count_odd_pentafib(0), 0);
}
#[test]
fn basic_tests7() {
    assert_eq!(count_odd_pentafib(1), 1);
}
#[test]
fn basic_tests8() {
    assert_eq!(count_odd_pentafib(2), 1);
}

