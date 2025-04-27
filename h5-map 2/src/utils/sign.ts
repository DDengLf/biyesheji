// utils/tencentMap.js
import CryptoJS from 'crypto-js'

const sk = 'T5WQwcBCHo8AvxzOuH8tliNtCirqbaVT'
/**
 * 生成腾讯地图API请求的签名
 * @param {Object} params - 请求参数对象
 * @returns {string} 返回生成的签名
 */
export function generateTencentMapSignature(params: Record<string, any>) {
    // 将参数对象转换为查询字符串并按字典序排序
    const queryString = Object.keys(params)
        .sort()
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

    // 拼接待签名字符串
    const stringToSign = `${queryString}${sk}`;

    // 使用MD5算法生成签名
    const hash = CryptoJS.MD5(stringToSign);
    const signature = hash.toString(CryptoJS.enc.Hex).toUpperCase();

    return signature;
}