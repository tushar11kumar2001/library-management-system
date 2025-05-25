import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { useDispatch } from "react-redux"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { UserWithBorrowBookThunk } from '../redux/UserSlice';

const DialogBox = (
    {
        open,
        bookFlag = false,
        userFlag = false,
        onClose,
        bookDetails,
        userDetails,
        label,
        heading,
        subHeading
    }
) => {
    const ExtendAction = async (userId, bookId) => {
        try { 
            const response = await axios.patch(
                `/admin/${userId}/extend/${bookId}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Optional if you're using cookies
                }
            );
            if (response.status === 200) {
                alert("User time extend successfully")
                window.location.reload();
            }
        } catch (error) {
            console.error("ExtendAction error:", error.message);
        }
    };
    const ReleaseAction = async (userId, bookId) => {
        console.log("Release Action"); 
        try {
            const response = await axios.patch(
                `/admin/${userId}/release/${bookId}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Optional if you're using cookies
                }
            );
            if (response.status === 200) {
                alert("User time extend successfully")
                window.location.reload();
            }
        } catch (error) {
            console.error("ExtendAction error:", error.message);
        }
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{label}</DialogTitle>
            <DialogContent>
                <Typography variant="h6">{heading}</Typography>
                <Typography>
                    <strong>{bookFlag ? "Title:" : "Name"}</strong>
                    {bookFlag ? bookDetails?.bookName : userDetails?.fullName}
                </Typography>
                <Typography>
                    <strong>{bookFlag ? "Author:" : "EmailID"}</strong>
                    {bookFlag ? bookDetails?.author : userDetails?.emailId}
                </Typography>
                <Typography>
                    <strong>{bookFlag ? "BookID:" : "UserID"}</strong>
                    {bookFlag ? bookDetails?.bookId : userDetails?.userId}
                </Typography>
                {/* <Typography*><strong>ISBN:</strong> {bookDetails.isbn}</Typography*/}

                <Typography variant="h6" style={{ marginTop: '20px' }}>{subHeading}</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>{bookFlag ? "User Name" : "Book Name"}</strong></TableCell>
                                <TableCell><strong>{bookFlag ? "Email ID" : "Author"}</strong></TableCell>
                                <TableCell><strong>{bookFlag ? "User ID" : "Book Id"}</strong></TableCell>
                                <TableCell><strong>Due TO</strong></TableCell>
                                {bookFlag ? "" : <TableCell><strong>Action</strong></TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                bookFlag && bookDetails?.borrowUsers?.map((borrower, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{borrower?.userId?.fullName}</TableCell>
                                        <TableCell>{borrower?.userId?.emailId}</TableCell>
                                        <TableCell>{borrower?.userId?.userId}</TableCell>
                                        <TableCell>
                                            <span
                                                className={
                                                    new Date(borrower.dueTo).toLocaleDateString() < new Date().toLocaleDateString() ?
                                                        "bg-red-500 text-white text-lg" :
                                                        "bg-green-500 text-white text-lg"
                                                }>{new Date(borrower?.dueTo).toLocaleDateString()} </span></TableCell>
                                    </TableRow>
                                ))
                            }
                            {
                                userFlag && userDetails?.borrowedBook?.map((book, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{book?.bookId?.bookName}</TableCell>
                                        <TableCell>{book?.bookId?.author}</TableCell>
                                        <TableCell>{book?.bookId?.bookId}</TableCell>
                                        <TableCell>
                                            <span
                                                className={
                                                    new Date(book?.dueTo).toLocaleDateString() < new Date().toLocaleDateString() ?
                                                        "bg-red-500 text-white text-lg" :
                                                        "bg-green-500 text-white text-lg"
                                                }>{new Date(book?.dueTo).toLocaleDateString()} </span>
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                className="text-blue-600 border border-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-50 transition"
                                                onClick={() => ExtendAction(userDetails._id, book.bookId._id)}>extend date</button> &nbsp;
                                            <button
                                                className="text-blue-600 border border-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-50 transition"
                                                onClick={() => ReleaseAction(userDetails._id, book.bookId._id)}>release</button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

DialogBox.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    bookDetails: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        isbn: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        borrowers: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default DialogBox;