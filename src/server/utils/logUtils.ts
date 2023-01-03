const getMethodName = () => {
  try {
    const err = new Error();
    const funcLine = err?.stack?.split('\n')[3] as string;
    const funcArr = /at \w+\.(\w+)/.exec(funcLine) as string[];

    return funcArr[1];
  } catch (e) {
    return 'unable to retrieve method name';
  }
};

export const logFunctionStart = () => {
  const functionName = getMethodName();

  // eslint-disable-next-line no-console
  console.log(`server function start: ${functionName}`);
};

export const logFunctionEnd = () => {
  const functionName = getMethodName();

  // eslint-disable-next-line no-console
  console.log(`server function end: ${functionName}`);
};

export const logParams = (paramsObj: Record<string, unknown>) => {
  // eslint-disable-next-line no-console
  console.log(`args: ${JSON.stringify(paramsObj, null, 2)}`);
};
