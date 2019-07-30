function tests(){
    let eqt = ["2*(3)=", "2+2(1+1)2+2=", "(1)*2=", "2*2(1+1)2*2=", "2*2(1+1(1))2+2=", "1+2(1+1)2/2*2=", "(5)"];
    for (let i= 0; i<eqt.length; i++) {
        console.log(eqt[i] + operate(eqt[i])[0]);
    }
    // console.log("RESULT " + operate(""));
};
