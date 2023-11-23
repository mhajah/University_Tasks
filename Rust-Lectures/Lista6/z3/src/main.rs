fn hamming(n: usize) -> u64 {
    let mut numbers = vec![1; n];
    let mut i2 = 0;
    let mut i3 = 0;
    let mut i5 = 0;

    for x in 1..n {
        let x2i = 2 * numbers[i2];
        let x3i = 3 * numbers[i3];
        let x5i = 5 * numbers[i5];

        numbers[x] = x2i.min(x3i.min(x5i));

        if x2i <= numbers[x] {
            i2 += 1;
        }
        if x3i <= numbers[x] {
            i3 += 1;
        }
        if x5i <= numbers[x] {
            i5 += 1;
        }
    }
    *numbers.last().unwrap()
}

fn main() {

    println!("{}", hamming(19));

}

#[test]
fn sample_tests1() {
    assert_eq!(hamming(12), 16);
}
#[test]
fn sample_tests2() {
    assert_eq!(hamming(13), 18);
}
#[test]
fn sample_tests3() {
    assert_eq!(hamming(14), 20);
}
#[test]
fn sample_tests4() {
    assert_eq!(hamming(15), 24);
}
#[test]
fn sample_tests5() {
    assert_eq!(hamming(17), 27);
}
#[test]
fn sample_tests6() {
    assert_eq!(hamming(19), 32);
}
