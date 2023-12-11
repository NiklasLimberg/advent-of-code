abstract class Monkey {
  /**
   * The items that the monkey has to operate on.
   */
  abstract items: number[];

  abstract devisor: number;

  abstract ifTrue: number;
  abstract ifFalse: number;

  /**
   * The number of items a monkey has inspected .
   */
  public itemsInspected = 0;

  increaseItemsInspected() {
    this.itemsInspected++;
  }

  abstract operate(number: number): number;

  getThrowTarget(number: number): number {
    return number % this.devisor === 0 ? this.ifTrue : this.ifFalse;
  }

  receiveItem(item: number): void {
    this.items.push(item);
  }
}

class Monkey0 extends Monkey {
  devisor = 3;
  ifTrue = 2;
  ifFalse = 3;

  items: number[] = [76, 88, 96, 97, 58, 61, 67];

  operate(number: number): number {
    return number * 19;
  }
}

class Monkey1 extends Monkey {
  items: number[] = [93, 71, 79, 83, 69, 70, 94, 98];

  devisor = 11;
  ifTrue = 5;
  ifFalse = 6;

  operate(number: number): number {
    return number + 8;
  }
}

class Monkey2 extends Monkey {
  items: number[] = [50, 74, 67, 92, 61, 76];

  devisor = 19;
  ifTrue = 3;
  ifFalse = 1;

  operate(number: number): number {
    return number * 13;
  }
}

class Monkey3 extends Monkey {
  items: number[] = [76, 92];

  devisor = 5;
  ifTrue = 1;
  ifFalse = 6;

  operate(number: number): number {
    return number + 6;
  }
}

class Monkey4 extends Monkey {
  items: number[] = [74, 94, 55, 87, 62];

  devisor = 2;
  ifTrue = 2;
  ifFalse = 0;

  operate(number: number): number {
    return number + 5;
  }
}

class Monkey5 extends Monkey {
  items: number[] = [59, 62, 53, 62];

  operate(number: number): number {
    return number * number;
  }

  devisor = 7;
  ifTrue = 4;
  ifFalse = 7;
}

class Monkey6 extends Monkey {
  items: number[] = [62];

  devisor = 17;
  ifTrue = 5;
  ifFalse = 7;

  operate(number: number): number {
    return number + 2;
  }
}

class Monkey7 extends Monkey {
  items: number[] = [85, 54, 53];

  devisor = 13;
  ifTrue = 4;
  ifFalse = 0;

  operate(number: number): number {
    return number + 3;
  }
}

const monkeys = [
  new Monkey0(),
  new Monkey1(),
  new Monkey2(),
  new Monkey3(),
  new Monkey4(),
  new Monkey5(),
  new Monkey6(),
  new Monkey7(),
];

const numberOfRounds = 10000;
const stressManagementDivisor = monkeys.reduce(
  (total, monkey) => total * monkey.devisor,
  1,
);

for (let round = 0; round < numberOfRounds; round++) {
  console.log(`Round ${round}`);
  for (const monkey of monkeys) {
    while (monkey.items.length) {
      const item = monkey.items.shift();
      if (item === undefined) {
        throw new Error("Item is undefined");
      }
      // console.log(`Monkey inspects an item with a worry level of ${item}.`);

      monkey.increaseItemsInspected();
      const result = monkey.operate(item) % stressManagementDivisor;
      const target = monkey.getThrowTarget(result);

      // console.log(`Item with worry level ${result} is thrown to monkey ${target}.`);

      monkeys[target].receiveItem(result);
    }
  }
}
// Sort the monkeys by the number of items they have inspected.
monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);

// Print the result.
console.log(monkeys.map((monkey) => monkey.itemsInspected));

console.log(monkeys[0].itemsInspected * monkeys[1].itemsInspected);

console.log(monkeys.map((monkey) => monkey.items));
