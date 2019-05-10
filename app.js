const dict = {
  0: [true, true, true, false, true, true, true],
  1: [false, false, true, false, false, true, false],
  2: [true, false, true, true, true, false, true],
  3: [true, false, true, true, false, true, true],
  4: [false, true, true, true, false, true, false],
  5: [true, true, false, true, false, true, true],
  6: [true, true, false, true, true, true, true],
  7: [true, false, true, false, false, true, false],
  8: [true, true, true, true, true, true, true],
  9: [true, true, true, true, false, true, true], // ou bien sans la barre en bas: [ true, true, true, true, false, true, false ]
  A: [true, true, true, true, true, true, false],
  B: [true, true, true, true, true, true, true],
  b: [false, true, false, true, true, true, true],
  C: [true, true, false, false, true, false, true],
  c: [false, false, false, true, true, false, true],
  D: [true, true, true, false, true, true, true],
  d: [false, false, true, true, true, true, true],
  E: [true, true, false, true, true, false, true],
  F: [true, true, false, true, true, false, false],
  H: [false, true, true, true, true, true, false],
  h: [false, true, false, true, true, true, false],
  I: [false, true, false, false, true, false, false],
  i: [false, false, false, false, true, false, false],
  J: [false, false, true, false, true, true, true],
  L: [false, true, false, false, true, false, true],
  l: [false, true, false, false, true, false, false],
  n: [false, false, false, true, true, true, false],
  O: [true, true, true, false, true, true, true],
  o: [false, false, false, true, true, true, true],
  P: [true, true, true, true, true, false, false],
  r: [false, false, false, true, true, false, false],
  S: [true, true, false, true, false, true, true],
  U: [false, true, true, false, true, true, true],
  u: [false, false, false, false, true, true, true],
  "-": [false, false, false, true, false, false, false],
  _: [false, false, false, false, false, false, true]
};

var app = new Vue({
  el: "#app",
  data: {
    message: "---",
    size: "normal",
    notValidChars: ["a", "e", "f", "G", "g", "j", "K", "k", "M", "m", "N", "p", "R", "s", "T", "t", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z"],
    exactMatch: false,
    capitalization: "caseSensitive",
    letterColorActive: "#3AEC1C",
    letterColorInactive: "#0C2103",
    bgColor: "#000000"
  },
  computed: {
    characters() {
      if (this.message.length > 0) {
        return this.message.split("").map(c => this.linesFromChar(c));
      }
      return [[false, false, false, false, false, false, false]];
    }
  },
  methods: {
    linesFromChar(c) {
      if (this.exactMatch) {
        if (dict[c]) {
          return dict[c];
        }
      } else {
        if (this.capitalization === "caseSensitive") {
          if (dict[c]) {
            return dict[c];
          } else if (dict[c.toUpperCase()]) {
            return dict[c.toUpperCase()];
          } else if (dict[c.toLowerCase()]) {
            return dict[c.toLowerCase()];
          }
        } else if (this.capitalization === "allLower") {
          if (dict[c.toLowerCase()]) {
            return dict[c.toLowerCase()];
          }
        } else if (this.capitalization === "allUpper") {
          if (dict[c.toUpperCase()]) {
            return dict[c.toUpperCase()];
          }
        }
      }

      return [false, false, false, false, false, false, false];
    },
    setMessageToCurrentDate() {
      var d = new Date();
      var mm = d.getMonth() + 1;
      var dd = d.getDate();
      this.message = d.getFullYear() + "-" + (mm > 9 ? "" : "0") + mm + "-" + (dd > 9 ? "" : "0") + dd;
    }
  },
  created() {
    this.setMessageToCurrentDate();
  }
});
