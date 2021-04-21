"use strict";

var colorList = ["rgba(112, 0, 0, 1)", "rgba(180, 0, 0, 1)", "rgba(250, 185, 0, 1)", "rgba(32, 138, 174, 1)", "rgba(13, 33, 73, 1)"];
var primary = "--primary";
var secondary = "--secondary";
var tertiary = "--tertiary";
var compteur = 0;
var primarySwap = document.getElementById("js-color-swap__btn-1");

primarySwap.onclick = function (_) {
  if (compteur >= colorList.length) {
    compteur = 0;
  }

  document.documentElement.style.setProperty(primary, colorList[compteur]);
  compteur++;
};

var secondarySwap = document.getElementById("js-color-swap__btn-2");

secondarySwap.onclick = function (_) {
  if (compteur >= colorList.length) {
    compteur = 0;
  }

  document.documentElement.style.setProperty(secondary, colorList[compteur]);
  compteur++;
};

var tertiarySwap = document.getElementById("js-color-swap__btn-3");

tertiarySwap.onclick = function (_) {
  if (compteur >= colorList.length) {
    compteur = 0;
  }

  document.documentElement.style.setProperty(tertiary, colorList[compteur]);
  compteur++;
}; // let tertiarySwap = document.getElementById("js-color-swap__btn-3");
//  tertiarySwap.onclick = colorSwap(tertiary)
// document.getElementById("js-color-swap__btn-3").addEventListener("click", colorSwap("--tertiary"));
// function colorSwap(colorN) {
//   if (compteur >= colorList.length) {
//     compteur = 0;
//   }
//   document.documentElement.style.setProperty(colorN, colorList[compteur]);
//   compteur++;
// }