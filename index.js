const getFeatures = () => {
  const mean = [
    50.551818181818184, 53.36272727272727, 48.14909090909091,
    25.616243851779533, 71.48177921778648, 6.469480065256369,
    103.46365541576832,
  ];

  const std = [
    36.91733383375668, 32.985882738587144, 50.64793054666006, 5.063748599958843,
    22.263811589761115, 0.7739376880298721, 54.95838852487811,
  ];

  featuresForm = document.querySelector(".features-form");
  features = [];
  featuresForm.querySelectorAll("input[type='number']").forEach((input, i) => {
    scaled = (Number(input.value) - mean[i]) / std[i];
    features.push(scaled);
  });
  return features;
};

const loadModel = async () => {
  model = undefined;
  model = await tf.loadLayersModel(
    "https://raw.githubusercontent.com/mostafa-gouda/crop-model/master/model/model.json"
  );
  return model;
};

const makePrediction = async (features) => {
  const classes = [
    "rice",
    "maize",
    "chickpea",
    "kidneybeans",
    "pigeonpeas",
    "mothbeans",
    "mungbean",
    "blackgram",
    "lentil",
    "pomegranate",
    "banana",
    "mango",
    "grapes",
    "watermelon",
    "muskmelon",
    "apple",
    "orange",
    "papaya",
    "coconut",
    "cotton",
    "jute",
    "coffee",
  ];
  let model = await loadModel();
  let input = tf.tensor2d([features]);
  let output = model.predict(input);
  let prediction = Math.max(...output.dataSync());
  let cropName = classes[output.dataSync().indexOf(prediction)];
  return cropName;
};

document.querySelector(".features-form").onsubmit = async (e) => {
  e.preventDefault();
  let features = getFeatures();
  let cropName = await makePrediction(features);
  document.querySelectorAll(".crop-name").forEach((element) => {
    element.innerHTML = cropName;
  });
};
