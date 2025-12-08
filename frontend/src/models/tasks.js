export const TaskStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
}

export class Task {
  constructor(title, description, status, dueDatetime) {
    if (!title || title.length < 2){
        throw new Error("Invalid Title")
    }
    this.title = title; // TODO: strip spaces
    this.description = description;
    if (!status) {
        this.status = TaskStatus.TODO // 'TODO' is default
    } else if ( !(status in TaskStatus) ) {
        throw new Error("Invalid Status")
    } 
    else {
        this.status = status;
    }

    // NOTE: This check only if variable exists
    if (!dueDatetime){ // TODO: add proper validation for Datetime format
        throw new Error("Invalid Datetime")
    }
    this.dueDatetime = dueDatetime;
  };

  // JSON keys to suit the backend 
  toJSON() {
    return {
        'title': this.title,
        'description': this.description,
        'status': this.status,
        'due_datetime': this.dueDatetime
    }
  }
}

