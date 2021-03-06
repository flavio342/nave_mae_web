import Vue from "vue";

Vue.filter("format", function(value, type) {
  if (type) {
    return Vue.filter(type)(value);
  } else {
    return value;
  }
});

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

Vue.filter("phone", function(value) {
  if (!value) {
    return "";
  }

  let phone = "";
  let mask = "";
  if (value.length == 11) {
    mask = "(**) * ****-****";
  } else {
    mask = "(**) ****-****";
  }

  let value_i = 0;
  let mask_i = 0;

  while (value_i < value.length && mask_i < mask.length) {
    if (mask[mask_i] == "*") {
      phone += value[value_i];
      value_i++;
    } else {
      phone += mask[mask_i];
    }
    mask_i++;
  }
  return phone;
});

Vue.filter("cpf", function(value) {
  if (!value) {
    return "";
  }

  let phone = "";
  let mask = "***.***.***-**";

  let value_i = 0;
  let mask_i = 0;

  while (value_i < value.length && mask_i < mask.length) {
    if (mask[mask_i] == "*") {
      phone += value[value_i];
      value_i++;
    } else {
      phone += mask[mask_i];
    }
    mask_i++;
  }
  return phone;
});

Vue.filter("removeImageURL", function(value) {
  if (!value) {
    return "";
  }

  let v = value.split("/");
  v = v[v.length - 1];
  return v;
});

Vue.filter("ordinal", function(value) {
  if (!value) {
    return "";
  }
  return value + "º";
});

Vue.prototype.$filters = Vue.options.filters;
