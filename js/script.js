/*===============================
  Calculator functionality
================================*/
var input_array = [],
  calc_array = [],
  input_string = "",
  calc_string = "",
  action = "",
  text = "",
  func = "",
  output = "0", //output value
  result = false, //output status
  memory = 0, //memory value
  mem_stat = false; //memory status

$(".calc-btn").on("click", function () {
  //get data-* attribute value
  action = $(this).attr("data-action");
  text = $(this).attr("data-text");
  func = $(this).attr("data-func");

  //get present output
  output = $(".screen-output").text();

  //data-action = number(1-9), zero, decimal, brac, root, qube-root
  if (
    action === "number" ||
    action === "zero" ||
    action === "decimal" ||
    action === "brac" ||
    action === "root" ||
    action === "qube-root"
  ) {
    if (result == true) {
      input_array = [];
      calc_array = [];
      result = false;
    }
    input_array.push(String(text));
    calc_array.push(String(func));
    //input displaying
    input_string = input_array.join("");
    $(".input-display").html(input_string);
    $(".input-indicator").show();
  }

  //data-action = plus, minus, multiply, division
  if (
    action === "plus" ||
    action === "minus" ||
    action === "multiply" ||
    action === "division"
  ) {
    if (result == true) {
      input_array = ["ans"];
      calc_array = ["ans"];
      result = false;
    }

    input_array.push(String(text));
    calc_array.push(String(func));
    //input displaying
    input_string = input_array.join("");
    $(".input-display").html(input_string);
    $(".input-indicator").show();
  }

  //data-action = del
  if (action === "del") {
    if (result == false) {
      input_array.pop();
      calc_array.pop();
      //input displaying
      input_string = input_array.join("");
      $(".input-display").html(input_string);
    }
  }

  //data-action = equal
  if (action === "equal") {
    if (calc_array.length > 0 && result == false) {
      calc_string = calc_array.join("");
      calc_string = calc_string.replace("ans", output);
      output = eval(calc_string);
      $(".screen-output").text(output);
      //input displaying
      input_string = input_array.join("");
      $(".input-display").html(input_string);
      $(".input-indicator").hide();
      result = true;
    }
  }

  //data-action = mem-plus, mem-minus, mem-s(memory store, previous memory content deleted)
  if (action === "mem-plus" || action === "mem-minus" || action === "mem-s") {
    if (result == true) {
      input_array = ["ans"];
      calc_array = ["ans"];
      //result = false; //true or false same result
    }

    if (calc_array.length > 0) {
      calc_string = calc_array.join("");
      calc_string = calc_string.replace("ans", output);
      output = eval(calc_string);
      $(".screen-output").text(output);

      //input displaying
      input_string = input_array.join("") + text;
      $(".input-display").html(input_string);
      $(".input-indicator").hide();
      result = true;
    }

    if (action === "mem-plus") {
      memory += Number(output);
    } else if (action === "mem-minus") {
      memory -= Number(output);
    } else if (action === "mem-s") {
      memory = Number(output);
    }

    $(".memory-stat").text("M:");
    $(".memory-val").text(memory);
    mem_stat = true;
  }

  //data-action = mem-r (recall memory, show the contents of memory)
  if (action === "mem-r") {
    if (mem_stat == true) {
      $(".screen-output").text(memory);
      //input displaying
      $(".input-display").html("M");
      $(".input-indicator").hide();
      result = true;
    }
  }

  //data-action = mem-c (clear memory)
  if (action === "mem-c") {
    memory = 0;
    $(".memory-stat").text("");
    $(".memory-val").text("");
    mem_stat = false;
  }

  //data-action = clear(resets the calculator without resetting the memory)
  if (action === "clear") {
    input_array = [];
    calc_array = [];
    output = "0";
    $(".screen-output").text(output);

    //input displaying
    $(".input-display").html("");
    $(".input-indicator").show();
    result = false;
  }

  //data-action = all-clear(reset the calculator and reset the memory) + power-on-off(turn on-off the calculator)
  if (
    action === "all-clear" ||
    action === "power-on" ||
    action === "power-off"
  ) {
    input_array = [];
    calc_array = [];
    output = "0";
    $(".screen-output").text(output);

    //input displaying
    $(".input-display").html("");
    $(".input-indicator").show();
    result = false;

    //memory resetting
    memory = 0;
    $(".memory-stat").text("");
    $(".memory-val").text("");
    mem_stat = false;

    if (action === "power-on") {
      $(".screen-off").removeClass("screen-off-active");
      $(".calc-btn").removeAttr("disabled");
    }

    if (action === "power-off") {
      $(".screen-off").addClass("screen-off-active");
      $(".calc-btn").attr("disabled", "disabled");
      $('.calc-btn[data-action="power-on"]').removeAttr("disabled");
    }
  }
});
