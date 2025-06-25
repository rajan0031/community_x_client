import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/groups', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setGroups(response.data);
            } catch (error) {
                alert('Error fetching groups', error);
            }
        };
        fetchGroups();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {groups.map((group) => (
                    <li key={group._id}>
                        {group.name} - {group.subscription} - {group.members} members
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;