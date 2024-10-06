const amountInput = document.getElementById("numberInput");
const currencySelect = document.getElementById("options");
const convertButton = document.getElementById("button");
const result = document.getElementById("result");
const url = "https://mindicador.cl/api";

let chartInstance = null; // Variable para almacenar la instancia del gráfico

async function fetchExchangeRate(currency) {
  try {
    const response = await fetch("https://mindicador.cl/api");
    if (!response.ok) {
      throw new Error("Error en la peticion");
    }
    const data = await response.json();
    if (currency === "dolar") {
      return data.dolar.valor; 
    } else if (currency === "euro") {
      return data.euro.valor; 
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    result.innerHTML = "Error al obtener los datos";
    throw error;
  }
}

convertButton.addEventListener("click", async () => {
  const amount = parseFloat(amountInput.value);
  const selectedCurrency = currencySelect.value; 

  if (isNaN(amount) || amount <= 0) {
    alert("Por favor ingresa una cantidad válida");
    return;
  }
  const exchangeRate = await fetchExchangeRate(selectedCurrency);

  if (exchangeRate) {
    const convertedAmount = (amount / exchangeRate).toFixed(2);
    const currencySymbol = selectedCurrency === "dolar" ? "$" : "€";
    result.innerHTML = `Resultado:  ${currencySymbol}${convertedAmount}`;
   
    //destruir grafico si existe uno
    if (chartInstance) {
      chartInstance.destroy(); 
    }
    //extraer valores y fechas
    let dates, values, label;
    if (selectedCurrency === "dolar") {
      dates = dolarValue.map((entry) => entry.fecha.split("T")[0]); // Fechas del dólar
      values = dolarValue.map((entry) => entry.valor); // Valores del dólar
      label = "Dólar";
    } else if (selectedCurrency === "euro") {
      dates = euroValue.map((entry) => entry.fecha.split("T")[0]); // Fechas del euro
      values = euroValue.map((entry) => entry.valor); // Valores del euro
      label = "Euro";
    }
    //invertir fechas, valores y renderizar
    renderChart(dates.reverse(), values.reverse(), label);
  }
});

//dolar
const dolarValue = [
  {
    fecha: "2024-10-03T03:00:00.000Z",
    valor: 908.23,
  },
  {
    fecha: "2024-10-02T03:00:00.000Z",
    valor: 901.13,
  },
  {
    fecha: "2024-10-01T03:00:00.000Z",
    valor: 897.68,
  },
  {
    fecha: "2024-09-30T03:00:00.000Z",
    valor: 896.25,
  },
  {
    fecha: "2024-09-27T03:00:00.000Z",
    valor: 900.91,
  },
  {
    fecha: "2024-09-26T03:00:00.000Z",
    valor: 912.24,
  },
  {
    fecha: "2024-09-25T03:00:00.000Z",
    valor: 911.51,
  },
  {
    fecha: "2024-09-24T03:00:00.000Z",
    valor: 924.81,
  },
  {
    fecha: "2024-09-23T03:00:00.000Z",
    valor: 927.15,
  },
  {
    fecha: "2024-09-17T03:00:00.000Z",
    valor: 923.37,
  },
];

//euro
const euroValue = [
  {
    fecha: "2024-10-03T03:00:00.000Z",
    valor: 1003.35,
  },
  {
    fecha: "2024-10-02T03:00:00.000Z",
    valor: 996.38,
  },
  {
    fecha: "2024-10-01T03:00:00.000Z",
    valor: 1001.43,
  },
  {
    fecha: "2024-09-30T03:00:00.000Z",
    valor: 1000.17,
  },
  {
    fecha: "2024-09-27T03:00:00.000Z",
    valor: 1006.83,
  },
  {
    fecha: "2024-09-26T03:00:00.000Z",
    valor: 1015.52,
  },
  {
    fecha: "2024-09-25T03:00:00.000Z",
    valor: 1017.08,
  },
  {
    fecha: "2024-09-24T03:00:00.000Z",
    valor: 1028.71,
  },
  {
    fecha: "2024-09-23T03:00:00.000Z",
    valor: 1030.51,
  },
  {
    fecha: "2024-09-17T03:00:00.000Z",
    valor: 1026.99,
  },
];

const renderChart = (dates, values, label) => {
  const ctx = document.getElementById("chart").getContext("2d");
  
  //destruir el gráfico si ya existe
  if (chartInstance) {
    chartInstance.destroy();
  }
  // crear nuevo gráfico
  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: label,
          data: values, 
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: false,
        },
        y: {
          beginAtZero: false,
        },
      },
    },
  });
};

