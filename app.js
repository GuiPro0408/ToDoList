$(document).ready(function () {
    // Task template to insert into the list
    function taskTemplate(taskName, taskDescription, dueDate) {
        return `
            <li class="flex items-center justify-between bg-white px-4 py-2 my-2 shadow">
                <div>
                    <p class="text-gray-800 font-semibold">${taskName}</p>
                    <p class="text-gray-600 text-sm">${taskDescription}</p>
                    <p class="text-gray-500 text-xs">Due by: ${dueDate}</p>
                </div>
                <button class="delete-task text-red-500 font-bold"><i class="fas fa-trash"></i></button>
            </li>
        `;
    }

    // Function to add a task
    function addTask(taskName, taskDescription, dueDate) {
        // Check if any field is empty
        if (!taskName || !dueDate) {
            alert('Please fill in all required fields.');
            return;
        }
        // Append the task to the task list
        $('#task-list').append(taskTemplate(taskName, taskDescription, dueDate));
    }

    // Event handler for submitting the form
    $('#task-form').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission

        var taskName = $('#taskName').val().trim();
        var taskDescription = $('#taskDescription').val().trim();
        var dueDate = $('#dueDate').val().trim();

        addTask(taskName, taskDescription, dueDate);

        // Clear the form fields after submission
        $('#taskName').val('');
        $('#taskDescription').val('');
        $('#dueDate').val('');

        openModal(); // Open the modal after submission
    });

    // Event delegation for dynamically added elements (Delete Task)
    $('#task-list').on('click', '.delete-task', function () {
        $(this).parent().remove();
    });

    // Function to open the modal
    function openModal() {
        $('#task-modal').removeClass('hidden');
    }

    // Function to close the modal
    function closeModal() {
        $('#task-modal').addClass('hidden');
    }

    // Event handler to open the modal when a button is clicked
    // Assuming there is a button with id #open-modal
    $('#open-modal').click(function () {
        openModal();
    });

    // Event handler to close the modal when the overlay is clicked
    $('#task-modal, #task-modal .overlay').click(function (event) {
        console.log(event.target);
        // Ensure the modal content itself is not the target
        if (event.target === this) {
            closeModal();
        }
    });

    // Function to generate random dates
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
    }

    // Function to generate a random task name
    function randomTaskName() {
        const tasks = ['Grocery Shopping', 'Laundry', 'Study JavaScript', 'Read a book', 'Write an article', 'Work out'];
        return tasks[Math.floor(Math.random() * tasks.length)];
    }

    // Function to generate a random task description
    function randomTaskDescription() {
        const descriptions = [
            'Complete by next week',
            'Urgent task',
            'Can be done anytime during the week',
            'Needs to be done today',
            'Important for the project',
            'Personal development task'
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    // Generate an array of task objects with random data
    function generateTasks(count) {
        const tasks = [];
        for (let i = 0; i < count; i++) {
            tasks.push({
                name: randomTaskName(),
                description: randomTaskDescription(),
                dueDate: randomDate(new Date(2022, 0, 1), new Date(2022, 11, 31))
            });
        }
        return tasks;
    }

    // Example: Generate 10 random tasks
    const seedTasks = generateTasks(10);
    
    // Add the tasks to the list
    seedTasks.forEach(task => {
        addTask(task.name, task.description, task.dueDate);
    });

});
