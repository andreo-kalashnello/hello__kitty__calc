let memory = 0;

export function memoryClear() {
  memory = 0;
}

export function memoryRecall() {
  return memory;
}

export function memoryAdd(value) {
  memory += value;
}

export function memorySubtract(value) {
  memory -= value;
}
