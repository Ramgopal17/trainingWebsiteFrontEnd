const spin = () => {
  const text = document.querySelector(".text p");
  // console.log(text.innerText);
  text.innerHTML = "7 YEARS OF EXPERIENCE - SINCE FROM 2016 -"
    .split("")
    .map(
      (char, i) =>
        `<span style="transform:rotate(${i * 8.6}deg)">${char}</span>`
    )
    .join("");
};

export default spin;
