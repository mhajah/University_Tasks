fn main() {
    println!("Hello, world!");
    println!("{}", find_odd(&[1, 1, 1, 1, 0, 20, 0, 3, 0, 3]));
}

fn find_odd(arr: &[i32]) -> i32 {
    let mut res = arr.to_vec();
    res.sort();

    let mut counter = -1;
    let mut prev_element = res[0];
    for &element in res.iter() {
        if element == prev_element {
            counter += 1;
        } else if counter%2 == 1 {
            return element;
        } else {
            counter = 0;
        }
        prev_element = element;
    }

    return 0;
}