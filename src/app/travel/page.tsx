'use client'

import { options } from "@/lib/constants";
import { dateAtom, diffDaysAtom } from "@/lib/store";
import { useAtom, useAtomValue } from "jotai";

export default function Travel() {

  const date = useAtomValue(dateAtom)
  const diffDays = useAtomValue(diffDaysAtom)
  const startDate = new Date(date?.from)

  return (
    <main className="flex grow flex-col items-center justify-center p-24 gap-8">
      {Array(diffDays).fill(null).map((_, index) => {
        startDate.setDate(startDate.getDate() + index)
        return (
          <div key={index}>
            <h2>Day {index + 1}: <span className="capitalize">{startDate.toLocaleDateString(undefined, options)}</span></h2>
            <form>
              <label>
                Morning
                <input type="text" name="morning" placeholder="Morning activities" />
              </label>
            </form>
          </div>
        )
      })}
    </main>
  );
}
