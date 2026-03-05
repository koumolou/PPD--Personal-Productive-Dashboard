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
    todayVsYesterdayInsight : todayVsYesterdayInsight,
    mostProductiveDayInsight : mostProductiveDayInsight



}

interface todayVsYesterdayInsight{
     today : number,
     yesterday:  number,
     difference : number,
     trend : "up" | "down" | "same",
    message : string

    }

 interface mostProductiveDayInsight {
    day : string | null,
    count: number,
    message : string
 }