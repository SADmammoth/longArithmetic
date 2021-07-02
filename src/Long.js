import isNegative from './methods/isNegative';
import numberInit from './helpers/numberInit';
import toString from './methods/toString';
import slice from './methods/slice';
import mutatingSlice from './methods/mutatingSlice';
import compare from './methods/compare';
import negate from './methods/negate';
import compareModule from './methods/compareModule';
import divide from './methods/divide';
import multiply from './methods/multiply';
import applyMethods from './helpers/applyMethods';
import subtract from './methods/subtract';
import add from './methods/add';

let config = {
  chunk: 4,
  maxDegree: 10000,
};

export default function Long(numberInput, degree) {
  const { chunk, maxDegree } = config;

  const { number, numberLength } = numberInit(
    numberInput,
    chunk,
    maxDegree,
    degree
  );

  let self = {
    number,
    degree: numberLength,
    chunk,
    lastChunk: number[number.length - 1],
    _constructor: Long,
  };

  let methods = {
    toString,
    isNegative,
    slice,
    mutatingSlice,
    add,
    subtract,
    multiply,
    divide,
    compare,
    negate,
    compareModule,
  };

  self = applyMethods(self, methods);

  return self;
}

export { config };
