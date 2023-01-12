let f1 = [x => x*x*x -27,   //x^3 - 27
          x => 3*x*x,
          x => 6*x,
          3]
          
// console.log(f1[0](3))

let f2 = [x => x*x*x*x - 0.55221125663623623,   //x^4 - 0.55221125663623623
          x => 4*x*x*x,
          x => 12*x*x,
          0.86203780
        ]
    

let f3 = [x => x*x*x*x ,   //x^3 - 27
          x => 4*x*x*x,
          x => 12*x*x,
          0
      ]
let f4 = [x => (x-512)*(x-512),  //x^3 - 27
          x => 2*x -1024,
          x => 2,
          512
     ]
let f5 = [x => Math.sin(x),  //x^3 - 27
          x => Math.cos(x),
          x => -1*Math.sin(x),
          0
]

let f6 = [x => Math.sin(x)*Math.sin(x),  //x^3 - 27
          x => 2*Math.cos(x)*Math.sin(x),
          x => -2*Math.sin(x)*Math.sin(x) + 2*Math.cos(x)*Math.cos(x),
          0
]

function compare(f,xn){
    return Math.abs(xn-f[3])
}


function olver(f,x0,n,print=false){
    let xn = x0
    let roznica_poprzednia=0;
    let roznica=0;
    for(let i =0;i<n;i++){
        if(print){
            roznica_poprzednia=roznica;
            roznica=compare(f,xn)
            console.log(`n: ${i+1}, xn= ${xn}, roznica = ${roznica}, zmiana: ${roznica_poprzednia/roznica}`)
        }
        xn = xn - f[0](xn)/f[1](xn) - f[2](xn)*f[0](xn)*f[0](xn)/(2*f[1](xn)*f[1](xn)*f[1](xn))
    }
    return xn
}



console.log("x^3 - 27")
olver(f1,2,10,true)


console.log("x -0.55221125663623623")
olver(f2,1,10,true)

console.log("x^4")
olver(f3,1,10,true)

console.log("(x-512)^2")
olver(f4,1,20,true)


console.log("sin(x)")
olver(f5,-0.01,10,true)

console.log("sin(x)^2")
olver(f6,-0.01,10,true)