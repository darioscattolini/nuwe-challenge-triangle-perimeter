type Perimeter = number;

type SolutionsAmount = number;

type SolutionsTracker = {
  [key in Perimeter]: SolutionsAmount;
};

type MaximisedSolutions = {
  perimeter: number;
  amount: number;
}

/** Class representing a right triangle */
class RightTriangle {
  /**
   * Given a right triangle's leg length and perimeter, calculate the other leg's length.
   * Combines formula for perimeter with Pythagorean theorem
   * @param {number} knownLeg - The length of the triangle's known leg.
   * @param {number} perimeter - The value of the triangle's perimeter.
   * @return {number} The value of the triangle's other leg.
   */
  public static otherLeg(knownLeg: number, perimeter: number) {
    return (perimeter ** 2 - 2 * perimeter * knownLeg) / (2 * (perimeter - knownLeg));
  }

  /**
   * Get the length of the triangle's hypotenuse.
   * @return {number} The hypotenuse's length.
   */
  public get hypot() {
    return Math.hypot(this.leg1, this.leg2);
  }

  /**
   * Get the value of the triangle's perimeter.
   * @return {number} The perimeter value.
   */
  public get perimeter() {
    return this.leg1 + this.leg2 + this.hypot;
  }

  /**
   * Create a right triangle.
   * @param {number} leg1 - The length of the triangle's first leg.
   * @param {number} leg2 - The length of the triangle's second leg.
   */
  constructor(
    public leg1: number,
    public leg2: number
  ) {}
}

const maxPerimeter = 1000;

const tracker: SolutionsTracker = {};

const maximisedSolutions: MaximisedSolutions = {
  perimeter: 0,
  amount: 0
}

/**
 * First leg is kept shorter or equal than the second to avoid triangle duplication.
 * Therefore it is shorter or equal to the max possible value for the other leg (given a max perimeter).
 */
for (let shortLeg = 1; shortLeg <= RightTriangle.otherLeg(shortLeg, maxPerimeter); shortLeg++) {
  console.log(shortLeg, RightTriangle.otherLeg(shortLeg, maxPerimeter));
  let triangle = new RightTriangle(shortLeg, shortLeg);

  while (triangle.perimeter <= maxPerimeter) {
    if (Number.isInteger(triangle.hypot)) {
      if (tracker[triangle.perimeter]) tracker[triangle.perimeter]++;
      else tracker[triangle.perimeter] = 1;
    }

    triangle.leg2++;
  }
}

for (const perimeter in tracker) {
  if (tracker[perimeter] > maximisedSolutions.amount) {
    maximisedSolutions.perimeter = Number(perimeter);
    maximisedSolutions.amount = tracker[perimeter];
  }
}

console.log(maximisedSolutions);
