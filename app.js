




let np = 0 
var flag = 0 ; 

let tables = []
let cont3 = document.getElementById("container3") 


function srtf( ar , np ){

    let arr = []
    let at = []
    let btt = []
    let ct = []
    let tat = []
    let wt = []

    let ganchatt = document.createElement("div")  
    ganchatt.setAttribute( "class" , "ganchatt")

    for( var i=0 ; i<np ; i++ ){
        arr.push([ar[i][0] , ar[i][1] , ar[i][2] ] ) 
        at[i] = ar[i][0]
        btt[i] = ar[i][1] 
    }
    var time = 0
    var cnt = 0 

    while( cnt < np ){
        var idx = -1 
        var nbt = 10000 
        for( var i=0 ; i<np ; i++ ){
            if( arr[i][1] > 0 && arr[i][0] <= time && arr[i][1] < nbt ){
                nbt = arr[i][1] ; 
                idx = i ; 
            }
        }
        var nt = 10000 
        if( idx == -1 ){
            for( var i=0 ; i<np ; i++ ){
                if( arr[i][1] > 0  && arr[i][0] < nt ){
                    nt = arr[i][0]
                    idx = i 
                    nbt = arr[i][1]
                }
                else if(arr[i][1]>0 && arr[i][0]==nt && arr[i][1] < nbt ){
                    idx = i 
                    nbt = arr[i][1]
                }
            }
            time = arr[idx][0] 
        }
        arr[idx][1] = arr[idx][1]-1 
        ganchatt.insertAdjacentHTML("beforeend" , `<div class="time"> s=${time}</div>` )
        ganchatt.insertAdjacentHTML("beforeend" , `<div class="process"> P${idx}</div>` )
        time = time+1 
        ganchatt.insertAdjacentHTML("beforeend" , `<div class="time"> e=${time}</div>` )
        if( arr[idx][1] == 0 ){
            cnt++ 
            ct[idx] = time 
            tat[idx] = ct[idx] - at[idx]
            wt[idx] = tat[idx] - btt[idx]
        }

    }

    // Making Container for Srtf 
    let d1 = document.createElement("div")    
    d1.setAttribute( "class" , "srtf innercontainer") 
    d1.insertAdjacentHTML("beforeend" , '<div class="algoheading" >S R T F</div>' )
    d1.insertAdjacentHTML("beforeend" , '<div class="algodes">Shortest Remaining Time First</div>' )

    let d2 = document.createElement("div")    
    d2.setAttribute( "class" , "innermost")

    // Making container for each columns 
    let c1 = document.createElement("div")
    c1.setAttribute( "class" , "pnsrtf cl" ) 
    let c2 = document.createElement("div")
    c2.setAttribute( "class" , "atsrtf cl" )
    let c3 = document.createElement("div")
    c3.setAttribute( "class" , "btsrtf cl" ) 
    let c4 = document.createElement("div")
    c4.setAttribute( "class" , "ctsrtf cl" )  
    let c5 = document.createElement("div")
    c5.setAttribute( "class" , "tatsrtf cl" ) 
    let c6 = document.createElement("div")
    c6.setAttribute( "class" , "wtsrtf cl" ) 
    d2.append(c1) 
    d2.append(c2)
    d2.append(c3)
    d2.append(c4)
    d2.append(c5)
    d2.append(c6)
    
    c1.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">P No</div>`) 
    c2.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">AT</div>`) 
    c3.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">BT</div>`) 
    c4.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">CT</div>`) 
    c5.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">TAT</div>`) 
    c6.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">WT</div>`) 

    let avgwaitingtime = 0 
    let avgturnaroundtime = 0 
    // Adding value to each column
    for( var i=0 ; i<np ; i++ ){
        c1.insertAdjacentHTML("beforeend" , `<div class="obox"> ${i}</div>`) 
        c2.insertAdjacentHTML("beforeend" , `<div class="obox"> ${at[i]}</div>`) 
        c3.insertAdjacentHTML("beforeend" , `<div class="obox"> ${btt[i]}</div>`) 
        c4.insertAdjacentHTML("beforeend" , `<div class="obox"> ${ct[i]}</div>`) 
        c5.insertAdjacentHTML("beforeend" , `<div class="obox"> ${tat[i]}</div>`) 
        c6.insertAdjacentHTML("beforeend" , `<div class="obox"> ${wt[i]}</div>`) 
        avgwaitingtime = avgwaitingtime + wt[i] ;
        avgturnaroundtime = avgturnaroundtime + tat[i] ;
    }
    avgwaitingtime = parseFloat(avgwaitingtime)/np ;
    avgturnaroundtime = parseFloat(avgturnaroundtime)/np ;
    cont3.prepend(d1) 
    d1.append(d2)
    d1.insertAdjacentHTML( "beforeend" , `<div class="performance"> Average waiting time = ${avgwaitingtime} <div>` ) ;
    d1.insertAdjacentHTML( "beforeend" , `<div class="performance"> Average turn around time = ${avgturnaroundtime} <div>` ) ;
    //d1.append(ganchatt)
    tables.push(d1)
}


// FCFS 
function fcfs( ar , np ){
    let arr =  []
    
    let ganchatt = document.createElement("div") ; 
    ganchatt.setAttribute( "class" , "ganchatt")

    for( var i=0 ; i<np ; i++ ){
        arr.push( [ar[i][0] , ar[i][1] , ar[i][2] ] )
    }

    let time = 0

    let at = []
    let bt = []

    for( var i=0 ; i<np ; i++ ){
        at[i] = arr[i][0]
        bt[i] = arr[i][1]
    }

    for( var i=1 ; i<np ; i++ ){
        for( var j=i ; j>=1 ; j-- ){
            if( arr[j-1][0] > arr[j][0] ){
                let temp = arr[j-1]
                arr[j-1]= arr[j]
                arr[j] = temp 
            }
        }
    }

    let wt = []
    let ps = [] 
    let ct = []
    let tat = []
    time = arr[0][0]
    for( var i=0 ; i<np ; i++ ){
        const at = arr[i][0] 
        const bt = arr[i][1]
        const cp = arr[i][2]  // Current Process number 
        if( at > time ){
            ps[i] = at 
            time = at 
        }
        else{
            ps[i] = time
        }
        ganchatt.insertAdjacentHTML("beforeend" , `<div class="time"> s=${time}</div>` )
        ganchatt.insertAdjacentHTML("beforeend" , `<div class="process"> P${cp}</div>` )
        ct[cp] = time + bt 
        tat[cp] = ct[cp]-at
        wt[cp] = tat[cp]-bt
        time = ct[cp]
        ganchatt.insertAdjacentHTML("beforeend" , `<div class="time"> e=${time}</div>` )
    }

    for( var i=0 ; i<np ; i++ ){
        console.log( ct[i] , tat[i] , wt[i])
    }

    // Making Container for fcfs 
    let d1 = document.createElement("div")    
    d1.setAttribute( "class" , "fcfs innercontainer") 
    d1.insertAdjacentHTML("beforeend" , '<div class="algoheading" >F C F S</div>' )
    d1.insertAdjacentHTML("beforeend" , '<div class="algodes">First Come First Serve</div>' )

    let d2 = document.createElement("div")    
    d2.setAttribute( "class" , "innermost")

    // Making container for each columns 
    let c1 = document.createElement("div")
    c1.setAttribute( "class" , "pnfcfs cl" ) 
    let c2 = document.createElement("div")
    c2.setAttribute( "class" , "atfcfs cl" )
    let c3 = document.createElement("div")
    c3.setAttribute( "class" , "btfcfs cl" ) 
    let c4 = document.createElement("div")
    c4.setAttribute( "class" , "ctfcfs cl" )  
    let c5 = document.createElement("div")
    c5.setAttribute( "class" , "tatfcfs cl" ) 
    let c6 = document.createElement("div")
    c6.setAttribute( "class" , "wtfcfs cl" ) 
    d2.append(c1) 
    d2.append(c2)
    d2.append(c3)
    d2.append(c4)
    d2.append(c5)
    d2.append(c6)
    
    c1.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">P No</div>`) 
    c2.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">AT</div>`) 
    c3.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">BT</div>`) 
    c4.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">CT</div>`) 
    c5.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">TAT</div>`) 
    c6.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">WT</div>`) 
    // Adding value to each column
    let avgwaitingtime = 0 
    let avgturnaroundtime = 0 
    for( var i=0 ; i<np ; i++ ){
        c1.insertAdjacentHTML("beforeend" , `<div class="obox"> ${i}</div>`) 
        c2.insertAdjacentHTML("beforeend" , `<div class="obox"> ${at[i]}</div>`) 
        c3.insertAdjacentHTML("beforeend" , `<div class="obox"> ${bt[i]}</div>`) 
        c4.insertAdjacentHTML("beforeend" , `<div class="obox"> ${ct[i]}</div>`) 
        c5.insertAdjacentHTML("beforeend" , `<div class="obox"> ${tat[i]}</div>`) 
        c6.insertAdjacentHTML("beforeend" , `<div class="obox"> ${wt[i]}</div>`) 
        avgwaitingtime = avgwaitingtime + wt[i] ;
        avgturnaroundtime = avgturnaroundtime + tat[i] ;
    }
    avgwaitingtime = parseFloat(avgwaitingtime)/np ;
    avgturnaroundtime = parseFloat(avgturnaroundtime)/np ;
    cont3.prepend(d1) 
    d1.append(d2)
    //d1.append(ganchatt)
    d1.insertAdjacentHTML( "beforeend" , `<div class="performance"> Average waiting time = ${avgwaitingtime} <div>` ) ;
    d1.insertAdjacentHTML( "beforeend" , `<div class="performance"> Average turn around time = ${avgturnaroundtime} <div>` ) ;
    d1.classList.add("op")
    tables.push(d1)
}


// SJF 
function find( arr , time , mark ){
    var idx = -1 
    var mx = 100000
    for( var i=0 ; i<arr.length ; i++ ){
        if( arr[i][0] <= time && mark[i]==0 ){
            if( arr[i][1] < mx ){
                mx = arr[i][1] 
                idx = i 
            }
        }
    }
    return idx ; 
}

function sjf( ar , np ){

    let arr =  []
    
    for( var i=0 ; i<np ; i++ ){
        arr.push( [ar[i][0] , ar[i][1] , ar[i][2] ] ) ;
    }

    let ct = []
    let btt = []
    var time = 0
    var cnt = 0
    let mark = []
    let at = [] 
    let tat = []
    let wt = []
    for( var i=0 ; i<np ; i++ ){
        mark.push(0) ; 
        at[i] = arr[i][0]
        btt[i] = arr[i][1]
    }

    while( cnt < np ){
        var idx = find( arr , time , mark )
        var nt = 10000  // New Time
        var bt = 10000  // New Brust Time
        if( idx == - 1 ){
            for( var i=0 ; i<np ; i++ ){
                if( mark[i]==0 ){
                    if( arr[i][0] < nt ){
                        nt = arr[i][0] ; 
                        idx = i ;
                        bt = arr[i][1] ; 
                    }
                    else if( arr[i][0]==nt && arr[i][1] < bt ){
                        idx = i ; 
                        bt = arr[i][1] ;
                    }
                }

            }
            time = nt ;
        }
        console.log(idx)
        ct[idx] = time + arr[idx][1] 
        tat[idx] = ct[idx] - at[idx] 
        wt[idx] = tat[idx]-btt[idx] 
        time = ct[idx]
        cnt++ 
        mark[idx] = 1
    }

    // Making Container for Sjf

    let d1 = document.createElement("div")    
    d1.setAttribute( "class" , "sjf innercontainer") 
    d1.insertAdjacentHTML("beforeend" , '<div class="algoheading">S J F</div>' )
    d1.insertAdjacentHTML("beforeend" , '<div class="algodes">Shortest Job First</div>' )

    let d2 = document.createElement("div")    
    d2.setAttribute( "class" , "innermost") 

    // Making container for each columns 
    let c1 = document.createElement("div")
    c1.setAttribute( "class" , "pnsjf cl" ) 
    let c2 = document.createElement("div")
    c2.setAttribute( "class" , "atsjf cl" )
    let c3 = document.createElement("div")
    c3.setAttribute( "class" , "btsjf cl" ) 
    let c4 = document.createElement("div")
    c4.setAttribute( "class" , "ctsjf cl" )  
    let c5 = document.createElement("div")
    c5.setAttribute( "class" , "tatsjf cl" ) 
    let c6 = document.createElement("div")
    c6.setAttribute( "class" , "wtsjf cl" ) 
    d2.append(c1) 
    d2.append(c2)
    d2.append(c3)
    d2.append(c4)
    d2.append(c5)
    d2.append(c6)

    c1.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">P No</div>`) 
    c2.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">AT</div>`) 
    c3.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">BT</div>`) 
    c4.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">CT</div>`) 
    c5.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">TAT</div>`) 
    c6.insertAdjacentHTML("beforeend" , `<div class="obox insidebox">WT</div>`)

    let avgwaitingtime = 0 
    let avgturnaroundtime = 0 
    
    // Adding value to each column
    for( var i=0 ; i<np ; i++ ){
        c1.insertAdjacentHTML("beforeend" , `<div class="obox"> ${i}</div>`) 
        c2.insertAdjacentHTML("beforeend" , `<div class="obox"> ${at[i]}</div>`) 
        c3.insertAdjacentHTML("beforeend" , `<div class="obox"> ${btt[i]}</div>`) 
        c4.insertAdjacentHTML("beforeend" , `<div class="obox"> ${ct[i]}</div>`) 
        c5.insertAdjacentHTML("beforeend" , `<div class="obox"> ${tat[i]}</div>`) 
        c6.insertAdjacentHTML("beforeend" , `<div class="obox"> ${wt[i]}</div>`) 
        avgwaitingtime = avgwaitingtime + wt[i] ;
        avgturnaroundtime = avgturnaroundtime + tat[i] ;
    }
    avgwaitingtime = parseFloat(avgwaitingtime)/np ;
    avgturnaroundtime = parseFloat(avgturnaroundtime)/np ;
    cont3.prepend(d1) 
    d1.append(d2)
    d1.insertAdjacentHTML( "beforeend" , `<div class="performance"> Average waiting time = ${avgwaitingtime} <div>` ) ;
    d1.insertAdjacentHTML( "beforeend" , `<div class="performance">Average turn around time = ${avgturnaroundtime} <div>` ) ;
    tables.push(d1)
}


// Creating Input Table 
function createTable( np ){
    document.getElementById("inputAT").remove()
    document.getElementById("inputBT").remove()
    document.getElementById("pno").remove()
    let f1 = document.createElement("div")
    f1.setAttribute("id" , "inputAT" )
    let f2 = document.createElement("div")
    f2.setAttribute("id" , "inputBT" )
    let f3 = document.createElement("div")
    f3.setAttribute("id" , "pno" )
    document.getElementById("input").append(f3) 
    document.getElementById("input").append(f1)
    document.getElementById("input").append(f2)
    let d1 = '<input   class="arrivalTime input2" name="numberInput" required>' 
    let d2 = '<input   class="brustTime input2" name="numberInput" required>' 
    let d3 = '<div   class="processnumber input2" ></div>' 
    let f4 = document.getElementById("container2")
    f4.innerHTML = '<div class="box">P No</div> <div class="box">AT</div><div class="box">BT</div> '

    for( var i=0 ; i<np ; i++ ){
        f3.insertAdjacentHTML("beforeend" , d3 ) 
        f1.insertAdjacentHTML("beforeend" , d1 ) 
        f2.insertAdjacentHTML("beforeend" , d2 ) 
    }
    for( var i=0 ; i<np ; i++ ){
        document.getElementsByClassName("processnumber")[i].innerHTML = `${i}`
    }
    document.getElementById("input").insertAdjacentHTML("beforeend" , '<button type="submit" id="b2" class="button">Submit</button>' ) 
}

// Button for Number of processes
document.getElementById("numberForm").addEventListener( "submit" , (event)=>{
    event.preventDefault();
    document.getElementById("o1").innerHTML = ""
    console.log("hey")
    np = document.getElementById("numberInput").value 
    np = parseInt(np)
    if( np <= 10 ){
        createTable(np)
    }
    else{
        document.getElementById("o1").innerHTML =  `Enter value less than equal to 10`
    }
})

// Button to start calculation
document.getElementById("input").addEventListener( "submit" , (event)=>{
    event.preventDefault();
    let arr = [] 
    let d1 = document.getElementsByClassName("arrivalTime") ; 
    let d2 = document.getElementsByClassName("brustTime") ; 
    let flag = 0 
    for( var i=0 ; i<np ; i++ ){
        arr.push( [ parseInt(d1[i].value) , parseInt(d2[i].value ) , parseInt(i) ] ) 
        if( !Number.isInteger(arr[i][0] )   || !Number.isInteger(arr[i][1] )  ) {
            flag = 1 ;
        }
    }
    if( flag == 1 ){
        alert("Please Enter only numeric values") 
    }
    else{
        fcfs( arr , np )
        console.log(arr)
        sjf( arr , np )
        srtf( arr , np )
        document.getElementsByClassName("button2")[0].classList.add("op")
        document.getElementsByClassName("button2")[1].classList.add("op")
    }
})

var cur = parseInt(0) 
document.getElementsByClassName("next")[0].addEventListener( "click" , ()=>{
    console.log( ( tables[cur]  ) )
    tables[cur].classList.remove("op")
    cur = (cur+1)%(tables.length)
    tables[cur].classList.add("op")
})

document.getElementsByClassName("prev")[0].addEventListener( "click" , ()=>{
    console.log( ( tables[cur]  ) )
    tables[cur].classList.remove("op")
    cur = (cur+1)%(tables.length)
    tables[cur].classList.add("op")
})
