// ============== 字符串翻转 ==============
/**
 * 方案 1
 * 利用 reverse() 翻转
 */
function reversetStr(str) {
  return str.split('').reverse().join('');
}

/**
 * 方案 2
 * 利用 charAt() 逐个字符拼接
 * 使用 for 循环
 */
function reversetStr2(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str.charAt(i);
    //         result += str[i]
  }
  return result;
}

/**
 * 方案 3
 * 利用 charAt() 逐个字符拼接
 * 使用递归，与方案 2 类似
 */
function reversetStr3(str, pos, result = '') {
  if (pos < 0) {
    return result;
  }
  result += str.charAt(pos--);
  return reversetStr3(str, pos, result);
}
let resverseString = 'abcdefg';
reversetStr3(resverseString, resverseString.length - 1);

/**
 * 方案 4
 * 利用 栈
 */
function Stack() {
  this.top = 0; // 记录栈顶位置
  this.data = []; // 存储栈内数据
}
Stack.prototype = {
  // 入栈
  push: function (ele) {
    this.data[this.top++] = ele;
  },
  // 出栈
  pop: function () {
    return this.data[--this.top];
  },
  // 栈长度
  length: function () {
    return this.data.length;
  },
};
class Stack1 {
  constructor() {
    this.top = 0;
    this.data = [];
  }
  push(ele) {
    this.data[this.top++] = ele;
  }
  // 出栈
  pop() {
    return this.data[--this.top];
  }
  // 栈长度
  length() {
    return this.data.length;
  }
}
function reversetStr4(str) {
  let result = '';
  let s = new Stack();
  let arr = str.split('');
  var len = str.length;

  for (let i = 0; i < arr.length; i++) {
    s.push(str[i]);
  }

  for (let j = 0; j < len; j++) {
    result += s.pop();
  }
  return result;
}

console.log(reversetStr2('abcde'));

// ============== 统计字符串中出现最多的字符及出现次数 ==============
/**
 * 方案 1
 * 利用 key-value 标识字符 及 出现的次数
 * 两次循环
 */
function getCharMaxCount(str) {
  let json = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (!json[char]) {
      json[char] = 1;
    } else {
      json[char]++;
    }
  }
  let maxCountChar = '';
  let maxCount = 0;
  for (key of json) {
    if (json[key] >= maxCount) {
      maxCount = json[key];
      // TODO: 如果多个字符 出现次数一样，需要加判断
      maxCountChar = key;
    }
  }
  return { maxCountChar, maxCount };
}

/**
 * 方案 2
 * 利用 key-value 标识字符 及 出现的次数
 * 利用 split() 函数 传入 待处理字符串，得到的数组 长度 减一 就是该字符出现的次数 (两刀切三段)
 * 同样次数 字符 结果显示 前面的字符
 */
function getCharMaxCount2(str) {
  let json = {},
    maxCountChar = '',
    maxCount = 0;
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (!json[char]) {
      let number = str.split(char).length - 1;
      if (number >= maxCount) {
        json[char] = number;
        number == maxCount
          ? (maxCountChar = `${maxCountChar},${char}`)
          : (maxCountChar = char);
        maxCount = number;
      }
    }
  }
  return { maxCountChar, maxCount };
}

/**
 * 方案 3
 * 先使用 sort 排序
 * 使用 lastIndexOf() 字符出现的 首尾索引值差 判断 字符出现的次数
 * 同样次数 字符 结果显示 后面的字符
 */
function getCharMaxCount3(str) {
  let json = {},
    maxCountChar = '',
    maxCount = 0;
  str = str.split('').sort().join('');

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (!json[char]) {
      let number = str.lastIndexOf(char) - i + 1;
      if (number >= maxCount) {
        json[char] = number;
        number == maxCount
          ? (maxCountChar = `${maxCountChar},${char}`)
          : (maxCountChar = char);
        maxCount = number;
      }
    }
  }
  return { maxCountChar, maxCount };
}
getCharMaxCount3('aahhhhp');
/** 方案 4 **/
// 利用match 匹配字符串 返回一个数组 ，数组长度就是字符串出现的次数

/** 方案 5 **/
// 利用replace()替换字符串 ，原始字符串长度减去 新字符串长度得到字符出现数
function getCharMaxCount5(str) {
  let maxCountChar = '',
    maxCount = 0;
  while (str.length) {
    // 原始长度
    let originStrLength = str.length;
    let char = str[0];
    let reg = new RegExp(char, 'g');
    str = str.replace(reg, '');
    let remainCount = str.length;
    let charCount = originStrLength - remainCount;
    if (charCount >= maxCount) {
      charCount == maxCount
        ? (maxCountChar = `${maxCountChar},${char}`)
        : (maxCountChar = char);
      maxCount = charCount;
    }
  }
  return { maxCountChar, maxCount };
}

// ============== 去除字符串中重复的字符 ==============

/**
 * 方案 1
 * 利用 key-value 标识字符
 */
function removeDuplicateChar1(str) {
  let result = [],
    json = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (!json[char]) {
      json[char] = true;
      result.push(char);
    }
  }
  return result.join('');
}

/**
 * 方案 2
 * 利用 indexOf() 判断  字符第一次出现的位置
 */
function removeDuplicateChar2(str) {
  let result = Array.prototype.filter.call(str, function (char, index, arr) {
    return str.indexOf(char) === index;
  });
  return result.join('');
}

/**
 * 方案 3
 * 使用 Set数据结构 去重
 */
function removeDuplicateChar3(str) {
  let set = new Set(str.split(''));
  return [...set].join('');
}

removeDuplicateChar1('hello world css javascript');

// ============== 判断字符串是否为回文字符串 ==============
// 回文字符串是指正序和倒序是相同的 eg: abcdcba

/**
 * 方案 1 字符逐个对比
 * 不区分大小写 a == A
 */
function isPalindromicStr(str) {
  // 空串返回true
  if (!str.length) return true;

  // 转化大小写并且转化为数组
  str = str.toLowerCase().split('');
  let start = 0,
    end = str.length - 1;
  while (start < end) {
    if (str[start] === str[end]) {
      start++;
      end--;
    } else {
      return false;
    }
  }
  return true;
}

/**
 * 方案 2 字符逐个对比
 * 不区分大小写 a == A
 * 递归处理
 */
function isPalindromicStr2(str) {
  // 空串返回true
  if (!str.length) return true;

  // 转化大小写
  str = str.toLowerCase();
  let start = 0,
    end = str.length - 1;
  if (str[start] !== str[end]) {
    return false;
  }
  // 删除首位字符 递归
  // 不能使用substring() 堆栈溢出  substring()
  str = str.slice(1, end);
  return isPalindromicStr2(str);
}
isPalindromicStr2('abcdcba');
/**
 * 方案 3 字符串逆序 与 源字符串比较是否相等
 * 不区分大小写 a == A
 * reverse()
 */
function isPalindromicStr3(str) {
  // 空串返回true
  if (!str.length) return true;

  // 转化大小写
  str = str.toLowerCase();
  let reverseStr = str.split('').reverse().join('');
  return reverseStr === str;
}
