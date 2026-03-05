interface Task  {
  id : number,
  title : string,
  completed : boolean,
  completedAt : string | null


}

interface Note  {
    id : string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string


}

interface Habit  {
    id: number,
    title: string,
    history : string []

}
 
interface User  {

      username: string,
      email : string,
      avatar : string,
      joinedDate: string
}

interface TaskContext {
    tasks : Task[],
    setTasks : React.Dispatch<React.SetStateAction<Task[]>>
    addTask :  (title : string) => void,
    totalTasks : number, 
    completedTasksCount : number,
    pendingTasks : number,
    completionPercentage : number, 
    todayCompletedCount : number,
    yesterdayCompletedCount : number,
    todayVsYesterdayInsight : TodayVsYesterdayInsight,
    mostProductiveDayInsight : MostProductiveDayInsight



}

interface TodayVsYesterdayInsight{
     today : number,
     yesterday:  number,
     difference : number,
     trend : "up" | "down" | "same",
    message : string

    }

 interface MostProductiveDayInsight {
    day : string | null,
    count: number,
    message : string
 }

 interface NoteContextType {
    note :Note[],
    setNotes :  React.Dispatch<React.SetStateAction<Note[]>>,
    addNote : (title : string, content : string) => void,
    updateNote: (id : string, title : string, content: string) => void,
    deleteNote: (id : string) => void,

 }

 interface HabitContextType {
    habits : Habit[],
    setHabits : React.Dispatch<React.SetStateAction<Habit[]>>,
    today : string,
    habitDoneToday : number, 
    activeStreakCount : number,
    habitCompletion : string | number,
    getActiveHabitsCount : ()=>number,
    getCurrentStreak : (history : string ) => number,
    addHabit : (title : string) => void





 }