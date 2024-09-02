import { atom } from 'jotai'
import { DateRange } from 'react-day-picker'

const day = 24 * 60 * 60 * 1000

const dateAtom = atom<DateRange | undefined>()
const diffDaysAtom = atom((get) => {
    const date = get(dateAtom);
    if (date?.from && date.to) {
        return Math.round(Math.abs(date?.from - date?.to) / day);
    };
    return 0
})

export {
    dateAtom,
    diffDaysAtom
}