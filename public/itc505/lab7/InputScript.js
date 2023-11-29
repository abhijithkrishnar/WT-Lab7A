const urlParams = new URLSearchParams(window.location.search);
const game = urlParams.get("game");
function goMad() {
  const label1 = document.getElementById("label1");
  const label2 = document.getElementById("label2");
  const label3 = document.getElementById("label3");
  const label4 = document.getElementById("label4");
  const label5 = document.getElementById("label5");
  const label6 = document.getElementById("label6");
  console.log(game);

  if (game === "Ethereal-Affections") {
    label1.textContent = "Name";
    label2.textContent = "Adjective";
    label3.textContent = "Place";
    label4.textContent = "Noun";
    label5.textContent = "Place";
    label6.textContent = "Noun";
  } else if (game === "Quest-for-Truth") {
    label1.textContent = "Adjective";
    label2.textContent = "Noun";
    label3.textContent = "Adjective";
    label4.textContent = "Place";
    label5.textContent = "Place";
    label6.textContent = "Noun";
  }
}

document.getElementById("goMadButton").addEventListener("click", function () {
  const input1 = document.getElementById("input1").value;
  const input2 = document.getElementById("input2").value;
  const input3 = document.getElementById("input3").value;
  const input4 = document.getElementById("input4").value;
  const input5 = document.getElementById("input5").value;
  const input6 = document.getElementById("input6").value;

  // Prepare data to send to server
  const data = {
    input1: input1,
    input2: input2,
    input3: input3,
    input4: input4,
    input5: input5,
    input6: input6,
    Game: game,
  };

  // Send form data to server using fetch
  fetch("/itc505/lab7", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      console.log(data);
      // Redirect to the story page
      window.location.href = data.redirectUrl; // Assuming the server responds with a redirect URL
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

goMad();
