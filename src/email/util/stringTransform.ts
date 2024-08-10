export const nameTransform = (fullName: string): string =>{
    return fullName.split(" ").map(name => {
        return name.charAt(0).toUpperCase() + name.slice(1)}).join(" ");
}