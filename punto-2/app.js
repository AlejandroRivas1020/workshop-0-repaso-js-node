class Grade {
    constructor(id, description) {
        this.id = id;
        this.description = description;
    }

}

class GradeManager {
    constructor() {
        this.grade = JSON.parse(localStorage.getItem('grade')) || [];
        this.loadGrade();
    }

    addGrade(description) {
        const id = this.grade.length ? this.grade[this.grade.length - 1].id + 1 : 1;
        const grade = new Grade(id, description);
        this.grade.push(grade);
        this.saveGrades();
        this.renderGrades();
    }

    deleteGrade(id) {
        this.grade = this.grade.filter(grade => grade.id !== id);
        this.saveGrades();
        this.renderGrades();
    }

    toggleTaskComplete(id) {
        const grade = this.grade.find(grade => grade.id === id);
        if (grade) {
            grade.toggleComplete();
            this.saveGrades();
            this.renderGrades();
        }

    }

    saveGrades() {
        localStorage.setItem('grade', JSON.stringify(this.grade));
    }

    loadGrade() {
        this.renderGrades();
    }

    renderGrades() {
        const gradeList = document.getElementById('grade-list');
        gradeList.innerHTML = '';
        this.grade.forEach(grade => {
            const item = document.createElement('li');
            item.textContent = grade.description;
            

            // const completedButton = document.createElement('button');
            // completedButton.textContent='Completar';
            // completedButton.className = grade.completed ? 'completed' : '';
            
            // completedButton.addEventListener('click', (e) => {
            //     e.stopPropagation(); 
            //     this.toggleTaskComplete(grade.id);
            //     alert('Tarea completada')
            // });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteGrade(grade.id);
            });

            // item.appendChild(completedButton);
            item.appendChild(deleteButton);
            gradeList.appendChild(item);

        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gradeManager = new GradeManager();

    document.getElementById('add-grade').addEventListener('click', () => {
        const newGrade = document.getElementById('new-grade').value;
        if(!Number(newGrade)){
            alert('valor invalido, ingrese un numero');
            
        }else if(newGrade) {
            gradeManager.addGrade(newGrade);
            document.getElementById('new-grade').value = '';
        }
    });
    
});