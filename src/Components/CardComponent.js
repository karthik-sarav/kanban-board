import { makeStyles } from '@material-ui/core/styles';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Draggable } from "react-beautiful-dnd";
import { Typography } from "@material-ui/core";
import CustomProfile from '../Images/CustomProfile';
import { customTheme } from '../Configs/Constants';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    cardItem: {
        backgroundColor: "white",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        borderRadius: "5px",
        height: "180px",
        marginBottom: "25px"
    },
    profileImage: {
        height: "30px",
        width: "30px",
        padding: "2px",
        marginLeft: "25px"
    },
    cardIcon: {
        padding: "2px", margin: "5px", color: customTheme.primary,
        "&:hover": {
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
            boxShadow: "1px black",
            cursor: "pointer"
        }
    },
    modalContainer: {
        display: "flex"
    },
    headingBold: {
        fontWeight: "bold"
    }

}));

const CardComponent = (props) => {
    const classes = useStyles();
    const { cardItem, index } = props;

    const [expandView, setExpandView] = useState(false);
    const [commentModal, setCommentModal] = useState(false);
    const [commentAdded, setCommentAdded] = useState(null)

    const handleExpand = () => {
        setExpandView(true);
    }

    const handleCloseExpand = () => {
        setExpandView(false);
    }

    const handleAddComment = () => {
        setCommentModal(true);
    }

    const handleCloseComment = () => {
        setCommentModal(false);
    }

    const onCommentInput = (e) => {
        setCommentAdded(e.target.value)
    }

    return (
        <>
            <Draggable key={cardItem.id} draggableId={cardItem.id} index={index}>
                {(provided) => (
                    <div className={classes.cardItem} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                        <div style={{ padding: "15px 0 0 15px" }} >
                            <Typography variant="subtitle1" style={{ fontWeight: "bold", letterSpacing: "0.5px" }}>{cardItem.title}</Typography>
                        </div>

                        <div>
                            <div style={{ padding: "15px 10px 10px 15px", height: "90px" }}>
                                <Typography variant="body1"> {cardItem?.id} </Typography>
                            </div>
                        </div>

                        <div style={{ display: "flex" }} >
                            <div style={{ display: "flex", marginLeft: "10px", width: "200px" }}>
                                <OpenWithIcon
                                    className={classes.cardIcon}
                                    fontSize="medium"
                                    onClick={handleExpand}
                                />
                                <ChatBubbleOutlineIcon
                                    className={classes.cardIcon}
                                    color="primary"
                                    fontSize="medium"
                                    onClick={(e) => handleAddComment(e, cardItem)}
                                />
                                <Chip style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    margin: "5px 0 0 8px",
                                    backgroundColor: customTheme.status[cardItem.status]
                                }}
                                    size="small"
                                    avatar={
                                        <div
                                            style={{
                                                color: customTheme.status[cardItem.status],
                                                backgroundColor: "whitesmoke",
                                                alignSelf: "center",
                                                borderRadius: "30px"
                                            }
                                            }>
                                            <Typography style={{ fontSize: "10px", fontWeight: "bold", alignSelf: "center", margin: "2px 2px 0px 6px" }}>
                                                {cardItem.status[0]}
                                            </Typography>
                                        </div>}
                                    label={cardItem.status}
                                />
                            </div>
                            <div className={classes.profileImage}>
                                <CustomProfile />
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>

            {commentModal &&
                <Modal show={commentModal} onHide={handleCloseComment}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Typography variant="subtitle1">{`Add comment to - ${cardItem.id}`}</Typography>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="comment"
                            label="Add comment..."
                            type="text"
                            fullWidth
                            onChange={(e) => onCommentInput(e)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseComment}>
                            <Typography variant="button">Close</Typography>
                        </Button>
                        <Button variant="primary" onClick={() => {
                            cardItem.comments.push(commentAdded)
                            handleCloseComment()
                        }}>
                            <Typography variant="button">Save</Typography>
                        </Button>
                    </Modal.Footer>
                </Modal>
            }

            {cardItem && expandView &&
                <Modal size="lg" show={expandView} onHide={handleCloseExpand}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Typography variant="subtitle1">{`${cardItem.id} - ${cardItem.title}`}</Typography>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={classes.modalContainer}>
                            <div style={{ flex: 2, margin: "10px 15px 10px 15px" }} >
                                <div id="description" style={{ marginBottom: "10px", height: "200px" }}>
                                    <Typography variant="subtitle1" className={classes.headingBold}>Description</Typography>
                                    <Typography variant="body2">
                                        {cardItem.description}
                                    </Typography>
                                </div>
                                <div id="comments" style={{ marginBottom: "10px" }}>
                                    <Typography variant="subtitle1" className={classes.headingBold}>Comments</Typography>
                                    {
                                        [...cardItem.comments].reverse().map((comment, index) => {
                                            return (<Typography key={index} variant="body2" style={{ margin: "3px" }}>
                                                {`${index + 1} - ${comment}`}
                                            </Typography>)
                                        })
                                    }
                                </div>
                            </div>
                            <Divider style={{ border: "1px solid grey", marginRight: "30px", height: "auto" }} />
                            <div id="details" style={{ flex: 1 }} >
                                <ModalListItem title={"ID: "} value={cardItem.id} />
                                <ModalListItem title={"Risk: "} value={cardItem.risk} />
                                <ModalListItem title={"Story Points: "} value={cardItem.storyPoints} />
                                <ModalListItem title={"Status: "} value={cardItem.status} />
                                <ModalListItem title={"Start Date: "} value={cardItem.startDate} />
                                <ModalListItem title={"End Date: "} value={cardItem.endDate} />
                                <ModalListItem title={"Assignee: "} value={cardItem.developer} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseExpand}>
                            <Typography variant="button">Close</Typography>
                        </Button>
                    </Modal.Footer>
                </Modal>
            }

        </>

    )
}

const ModalListItem = (props) => {
    const classes = useStyles();
    const { title, value } = props;
    return (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
            <Typography variant="subtitle1" className={classes.headingBold} >{title}</Typography>
            {title === "Status: " ?
                <Chip style={{
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: customTheme.status[value]
                }}
                    avatar={<Avatar
                        style={{
                            color: customTheme.status[value],
                            backgroundColor: "whitesmoke",
                            alignSelf: "center",
                            justifyContent: "center"
                        }}>{value[0]}</Avatar>}
                    label={value}
                />
                :
                < Typography variant="body2" style={{ alignSelf: "center" }} >{value}</Typography>
            }
        </div >
    )
}

export default CardComponent;