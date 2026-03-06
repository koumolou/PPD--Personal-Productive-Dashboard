export interface Task  {
  id : number,
  title : string,
  completed : boolean,
  completedAt :  string | null


}

export interface Note  {
    id : string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string


}

export interface Habit  {
    id: number,
    title: string,
    history : string []

}
 
export interface User  {

      username: string,
      email : string,
      avatar : string,
      joinedDate: string
}

export interface TaskContextType {
    tasks : Task[],
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

 export interface TodayVsYesterdayInsight{
     today : number,
     yesterday:  number,
     difference : number,
     trend : "up" | "down" | "same", 
    message : string

    }

export  interface MostProductiveDayInsight {
    day : string | null,
    count: number,
    message : string
 }

 export interface NoteContextType {
    notes :Note[],
    
    addNote : (title : string, content : string) => void,
    updateNote: (id : string, title : string, content: string) => void,
    deleteNote: (id : string) => void,

 }

  export interface HabitContextType {
    habits : Habit[],
    today : string,
    habitDoneToday : number, 
    activeStreakCount : number,
    habitCompletion : number
    getActiveHabitsCount : ()=>number,
    getCurrentStreak : (history : string[] ) => number,
    addHabit : (title : string) => void

 



 }

export interface UserContextType {
    user : User,
    updateUser : (newuser : Partial<User>) => void, 
    
 }

 export interface ModalContextType {
    isOpen : boolean,
    modalContent : React.ReactNode,
    openModal : (content : React.ReactNode) => void
    closeModal : ()=> void 
 }

  export interface SidebarContextType {
    isSidebarOpen : boolean,
    toggleSidebar : () => void,
    openSidebar : () => void,
    closeSidebar : () => void 

 }

 