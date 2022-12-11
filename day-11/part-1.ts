abstract class Monkey {
  /**
   * The items that the monkey has to operate on.
   */
  abstract items: number[];

  /**
   * The number of items a monkey has inspected .
   */
  public itemsInspected = 0;

  increaseItemsInspected() {
    this.itemsInspected++;
  }

  abstract operate(number: number): number;

  abstract getThrowTarget(number: number): number;

  receiveItem(item: number): void {
    this.items.push(item);
  }
}

class Monkey0 extends Monkey {
  items: number[] = [76, 88, 96, 97, 58, 61, 67];

  operate(number: number): number {
    return number * 19;
  }

  getThrowTarget(number: number): number {
    return number % 3 === 0 ? 2 : 3;
  }
}

class Monkey1 extends Monkey {
  items: number[] = [93, 71, 79, 83, 69, 70, 94, 98];

  operate(number: number): number {
    return number + 8;
  }

  getThrowTarget(number: number): number {
    return number % 11 === 0 ? 5 : 6;
  }
}

class Monkey2 extends Monkey {
  items: number[] = [50, 74, 67, 92, 61, 76];

  operate(number: number): number {
    return number * 13;
  }

  getThrowTarget(number: number): number {
    return number % 19 === 0 ? 3 : 1;
  }
}

class Monkey3 extends Monkey {
  items: number[] = [76, 92];

  operate(number: number): number {
    return number + 6;
  }

  getThrowTarget(number: number): number {
    return number % 5 === 0 ? 1 : 6;
  }
}

class Monkey4 extends Monkey {
  items: number[] = [74, 94, 55, 87, 62];

  operate(number: number): number {
    return number + 5;
  }

  getThrowTarget(number: number): number {
    return number % 2 === 0 ? 2 : 0;
  }
}

class Monkey5 extends Monkey {
  items: number[] = [59, 62, 53, 62];

  operate(number: number): number {
    return number * number;
  }

  getThrowTarget(number: number): number {
    return number % 7 === 0 ? 4 : 7;
  }
}

class Monkey6 extends Monkey {
  items: number[] = [62];

  operate(number: number): number {
    return number + 2;
  }

  getThrowTarget(number: number): number {
    return number % 17 === 0 ? 5 : 7;
  }
}

class Monkey7 extends Monkey {
  items: number[] = [85, 54, 53];

  operate(number: number): number {
    return number + 3;
  }

  getThrowTarget(number: number): number {
    return number % 13 === 0 ? 4 : 0;
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

const numberOfRounds = 20;

for (let round = 0; round < numberOfRounds; round++) {
  console.log(`Round ${round}`);
  for (const monkey of monkeys) {
    while (monkey.items.length) {
      const item = monkey.items.shift();
      if (item === undefined) {
        throw new Error("Item is undefined");
      }
      monkey.increaseItemsInspected();
      const result = Math.floor(monkey.operate(item) / 3);
      const target = monkey.getThrowTarget(result);

      monkeys[target].receiveItem(result);
    }
  }
}

// Sort the monkeys by the number of items they have inspected.
monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);

// Print the result.
console.log(monkeys.map((monkey) => monkey.itemsInspected));

console.log(monkeys[0].itemsInspected * monkeys[1].itemsInspected);
