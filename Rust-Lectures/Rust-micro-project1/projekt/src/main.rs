use std::fs::File;
use std::io::{self, Write};


/* Liczby zespolony */
#[derive(Clone, Copy)]
struct Complex {
    real: f64,
    imaginary: f64,
}

impl Complex {
    fn new(real: f64, imaginary: f64) -> Complex {
        Complex { real, imaginary }
    }

    fn magnitude_squared(&self) -> f64 {
        self.real * self.real + self.imaginary * self.imaginary
    }

    fn add(&self, other: Complex) -> Complex {
        Complex::new(self.real + other.real, self.imaginary + other.imaginary)
    }

    fn multiply(&self, other: Complex) -> Complex {
        let real = self.real * other.real - self.imaginary * other.imaginary;
        let imaginary = self.real * other.imaginary + self.imaginary * other.real;
        Complex::new(real, imaginary)
    }
}

/* Tworzenie obrazków PPM */
#[derive(Clone, Copy)]
struct Pixel {
    red: u8,
    green: u8,
    blue: u8,
}

struct Image {
    width: u32,
    height: u32,
    pixels: Vec<Pixel>,
}

impl Image {
    fn new(width: u32, height: u32) -> Image {
        let mut pixels = Vec::with_capacity((width * height) as usize);
        pixels.resize((width * height) as usize, Pixel { red: 0, green: 0, blue: 0 });

        Image {
            width,
            height,
            pixels,
        }
    }

    fn set_pixel(&mut self, x: u32, y: u32, red: u8, green: u8, blue: u8) {
        let index = (y * self.width + x) as usize;
        if index < self.pixels.len() {
            self.pixels[index] = Pixel { red, green, blue };
        }
    }

    fn save_as_ppm(&self, filename: &str) -> io::Result<()> {
        let mut file = File::create(filename)?;

        writeln!(file, "P3")?;
        writeln!(file, "{} {}", self.width, self.height)?;
        writeln!(file, "255")?;

        for pixel in &self.pixels {
            writeln!(file, "{} {} {}", pixel.red, pixel.green, pixel.blue)?;
        }

        Ok(())
    }
}

fn mandelbrot_escape_time(c: Complex, max_iterations: u32) -> u32 {
    let mut z = Complex::new(0.0, 0.0);
    let mut n = 0;

    while n < max_iterations && z.magnitude_squared() <= 4.0 {
        z = z.multiply(z).add(c);
        n += 1;
    }

    n
}

fn generate_mandelbrot(width: u32, height: u32, x_min: f64, x_max: f64, y_min: f64, y_max: f64, max_iterations: u32) -> Image {
    let mut image = Image::new(width, height);
    let x_scale = (x_max - x_min) / f64::from(width - 1);
    let y_scale = (y_max - y_min) / f64::from(height - 1);

    for y in 0..height {
        for x in 0..width {
            let c_real = x_min + f64::from(x) * x_scale;
            let c_imaginary = y_min + f64::from(y) * y_scale;
            let c = Complex::new(c_real, c_imaginary);
            let escape_time = mandelbrot_escape_time(c, max_iterations);

            let color_value = (255 - (escape_time % 256)) as u8;
            image.set_pixel(x, y, color_value, color_value, color_value);
        }
    }

    image
}

fn main() {
    let width = 1000;
    let height = 1000;
    let x_min = -2.0;
    let x_max = 1.0;
    let y_min = -1.5;
    let y_max = 1.5;
    let max_iterations = 1000;

    let mandelbrot_image = generate_mandelbrot(width, height, x_min, x_max, y_min, y_max, max_iterations);

    if let Err(err) = mandelbrot_image.save_as_ppm("mandelbrot.ppm") {
        eprintln!("Błąd zapisu pliku: {}", err);
    }
}
