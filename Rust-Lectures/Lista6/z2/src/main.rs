mod solution {
    pub fn range_extraction(a: &[i32]) -> String {
        a
            .iter()
            .fold(Vec::new(), divide_into_future_ranges)
            .into_iter()
            .map(make_ranges)
            .collect::<Vec<String>>()
            .join(",")
    }   

    fn divide_into_future_ranges(mut ranges: Vec<Vec<i32>>, &number: &i32) -> Vec<Vec<i32>> {
        if ranges.is_empty() {
            ranges.push(vec![number]);
            return ranges;
        }

        let last_range = ranges.last_mut().unwrap();
        let last_number = *last_range.last().unwrap();

        if number == last_number + 1 {
            last_range.push(number);
        } else {
            ranges.push(vec![number]);
        }

        ranges
    }

    fn make_ranges(range: Vec<i32>) -> String {
        if range.len() < 3 {
            range.into_iter().map(|num| num.to_string()).collect::<Vec<String>>().join(",")
        } else {
            format!("{}-{}", range[0], range.last().unwrap())
        }
    }
}

fn main() {
    let individual_integers = [1, 2, 3, -3, 3, 3, 3, 3, 3];
    let result = solution::range_extraction(&individual_integers);
    println!("{}", result);
}


#[test]
fn test1() {
    assert_eq!(solution::range_extraction(&[-6,-3,-2,-1,0,1,3,4,5,7,8,9,10,11,14,15,17,18,19,20]), "-6,-3-1,3-5,7-11,14,15,17-20");	
}
#[test]
fn test2() {
    assert_eq!(solution::range_extraction(&[-3,-2,-1,2,10,15,16,18,19,20]), "-3--1,2,10,15,16,18-20");
}
#[test]
fn test3() {
    assert_eq!(solution::range_extraction(&[1, 2, 3, 5, 6, 8, 10, 11, 12]), "1-3,5,6,8,10-12");	
}
#[test]
fn test4() {
    assert_eq!(solution::range_extraction(&[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]), "-5-5");	
}
#[test]
fn test5() {
    assert_eq!(solution::range_extraction(&[1, 2, 3, -3, 3, 3, 3, 3, 3]), "1-3,-3,3,3,3,3,3");	
}