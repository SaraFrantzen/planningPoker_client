 const votingStatusCalculator = (setStatus0, setStatus1, setStatus2, setStatus3, statusCounter) => {
    let zero = 0;
    let one = 0;
    let two = 0;
    let three = 0;
    setStatus0(0);
    setStatus1(0);
    setStatus2(0);
    setStatus3(0);
    for (let i = 0; i < statusCounter.length; i++) {
      if (statusCounter[i] === 0) {
        zero++;
        setStatus0(zero);
      } else if (statusCounter[i] === 1) {
        one++;
        setStatus1(one);
      } else if (statusCounter[i] === 2) {
        two++;
        setStatus2(two);
      } else if (statusCounter[i] === 3) {
        three++;
        setStatus3(three);
      }
    }
}
export default votingStatusCalculator