import React, { useState, useEffect } from "react";
import Column from "../components/Column";
import { fetchTasks } from "../services/api";
import "../styles/KanbanBoard.css";

 // Default grouping by Status

const KanbanBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [groupBy, setGroupBy] = useState(
        localStorage.getItem('groupBy') || 'Status'
    );
    const [sortBy, setSortBy] = useState(
        localStorage.getItem('sortBy') || 'Priority'
    ); 
    const columns = ["Backlog", "Todo", "In progress", "Done", "Canceled"];

    useEffect(() => {
        localStorage.setItem('groupBy', groupBy);
    }, [groupBy]);

    useEffect(() => {
        localStorage.setItem('sortBy', sortBy);
    }, [sortBy]);

    const groupTickets = (tickets) => {
        switch(groupBy) {
          case 'Status':
            return tickets.reduce((acc, ticket) => {
              acc[ticket.status] = acc[ticket.status] || [];
              acc[ticket.status].push(ticket);
              return acc;
            }, {});
          case 'User':
            return tickets.reduce((acc, ticket) => {
              acc[ticket.assignedUser] = acc[ticket.assignedUser] || [];
              acc[ticket.assignedUser].push(ticket);
              return acc;
            }, {});
          case 'Priority':
            return tickets.reduce((acc, ticket) => {
              acc[ticket.priority] = acc[ticket.priority] || [];
              acc[ticket.priority].push(ticket);
              return acc;
            }, {});
          default:
            return tickets;
        }
    };
    
    const sortTickets = (tickets) => {
        switch (sortBy) {
          case 'Priority':
            return tickets.sort((a, b) => b.priority - a.priority); // Descending priority
          case 'Title':
            return tickets.sort((a, b) => a.title.localeCompare(b.title)); // Ascending title
          default:
            return tickets;
        }
    };
      
  
    useEffect(() => {
      const loadTasks = async () => {
        const data = await fetchTasks();
        console.log("Ticket statuses:", data.map(ticket => ticket.status));
        if(Array.isArray(data)){
            setTasks(data);
        } else {
            setTasks([]);
        }
      };
      loadTasks();
    }, []);
  
    return (
      <div className="kanban-board">
        <div className="group-by">
            <select onChange={(e) => setGroupBy(e.target.value)} value={groupBy}>
                <option value="Status">By Status</option>
                <option value="User">By User</option>
                <option value="Priority">By Priority</option>
            </select>
        </div>
        <div className="sort-by">
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                <option value="Priority">By Priority</option>
                <option value="Title">By Title</option>
            </select>
        </div>

        {Object.keys(groupTickets(tasks)).map((group) => (
            <Column
                key={group}
                title={group}
                tasks={sortTickets(groupTickets(tasks)[group])}
            />
        ))}
      </div>
    );
  };
  
  export default KanbanBoard;