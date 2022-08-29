const isrealPhonePattern = new RegExp(/^(0(?:[23489]|5[0-689]|7[2346789])(?![01])(\d{7}))|(1(?:[7-9])00(\d{6}))|(1599(\d{6}))$/)

export const validateIsraelPhoneNumber = (number) => {
    return isrealPhonePattern.test(number)
}