import Vue from "vue";

Vue.filter("toCurrency", function(value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });
  return formatter.format(value);
});

Vue.filter("negative", function(value) {
  if (value[0] != "R" || value[1] != "$") {
    return value;
  }
  return "- " + value;
});
