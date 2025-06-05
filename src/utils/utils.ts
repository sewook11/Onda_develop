/**
 * 날짜 형식 통일 함수
 * Date 객체를 `YYYY-MM-DD` 형식의 문자열로 변환
 *
 * @param {Date} date - 변환할 Date 객체
 * @returns {string} `YYYY-MM-DD` 형식의 날짜 문자열
 */
export const formatDate = (value: string | Date): string => {
    const date = new Date(value);
  
    // 유효한 날짜인지 체크
    if (isNaN(date.getTime())) return 'Invalid Date';
  
    // 로컬(KST) 기준으로 YYYY-MM-DD 포맷
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };