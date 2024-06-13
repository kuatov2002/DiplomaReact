import React, { useState, useEffect } from 'react';
import './Base.css';
import { Pagination, Stack, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Base = () => {
    const [problems, setProblems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    useEffect(() => {
        const fetchProblems = async () => {
            setIsLoading(true); // Start loading indicator
            try {
                const response = await axios.post('https://algoanalysesdeploym-production-2364.up.railway.app/find_All_Paginated', {
                    input: { page: currentPage, size: 5 },
                });
                const responseData = response.data;
                setProblems(responseData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false); // Stop loading indicator
            }
        };

        fetchProblems();
    }, [currentPage]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="Base">
            <Box style={{ width: 1100 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Problem Base
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Topic</TableCell>
                                <TableCell>Difficulty</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? ( // Show loading indicator if isLoading is true
                                <TableRow>
                                    <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                problems.map((problem, index) => (
                                    <TableRow key={index} style={{ backgroundColor: index % 2 === 1 ? '#B9DEC1' : 'transparent' }}>
                                        <TableCell>
                                            <Link to={`/Base/${problem.problemId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                {problem.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell style={{ width: 300 }}>{problem.topic}</TableCell>
                                        <TableCell style={{ width: 200 }}>{problem.difficulty}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Stack style={{ marginTop: 10 }}>
                <Pagination count={124} page={currentPage} onChange={handleChange} />
            </Stack>
        </div>
    );
};

export default Base;
