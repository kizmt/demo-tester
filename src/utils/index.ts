export const retryFn = async (
  fn: (...x: any) => Promise<any>,
  opts = { maxRetries: 3 },
) => {
  for (let attempt = 1; attempt <= opts?.maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err: any) {
      if (attempt <= opts?.maxRetries) {
        console.error(err?.message, `(retry ${attempt}/${opts?.maxRetries})`)
        await sleep(100)
      } else {
        console.error(err?.message)
      }
    }
  }
  throw Error(`failed after ${opts?.maxRetries} retries`)
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function isEqual(obj1: any, obj2: any, keys: Array<string>) {
  if (!keys && Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
  }
  keys = keys || Object.keys(obj1)
  for (const k of keys) {
    if (obj1[k] !== obj2[k]) {
      // shallow comparison
      return false
    }
  }
  return true
}

export const copyToClipboard = async (copyThis: string) => {
  try {
    await navigator.clipboard.writeText(copyThis);
    console.log('Text successfully copied to clipboard');
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

