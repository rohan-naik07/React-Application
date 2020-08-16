import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
    import { Button,Modal,ModalHeader,ModalBody,NavbarToggler, Label,Col,Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


class CommentForm extends Component{
    constructor(props){
        super (props);
        this.state = {
            isModalOpen : false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }
        handleSubmit(values){
            this.toggleModal();
            alert(values);
        }
         
        render() {
        return(
            <div>
            <Button outline onClick={(values)=>this.toggleModal(values)}>
             <span className="fa fa-pencil" /> Submit Comment
             </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={this.handleSubmit}>
                <Row className="form-group">      
                <Label htmlFor="Rating" md={12}>Rating</Label>
                <Col md={{size : 12}}> 
                    <Control.select model=".Rating" name="Rating"
                        className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                </Col>   
                </Row>
                <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                  />
                </Col>
              </Row>
                <Row className="form-group">
                <Label htmlFor="comment" md={2}>Comment</Label>
                    <Col md={12}>
                        <Control.textarea model=".comment" id="comment" name="comment"
                            rows="6"
                            className="form-control"/>
                    </Col>
                </Row>
                <Button type="submit" color="primary">
                Submit
                </Button>
                </LocalForm>
            </ModalBody>
            </Modal>
            </div>
        );
      }
    }

    function RenderDish({dish}){
        return(
        <div className="col-12 col-md-5 m-1" >
            <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardText>{dish.description}</CardText>
            </CardBody>
            </Card>
        </div>
        );
    }
    function RenderComments({comments}){
        if(comments!=null){
            const comments_list = comments.map((comment)=>{
                return(
                    <div key = {comment.id}>
                        <p>{comment.comment}</p>
                    <p>--{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', 
                            month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                );
            });
            return(
            <div className="col-12 col-md-5 m-1" >
              <h4>Comments</h4>
              <ul className='list-unstyled'>
                {comments_list} </ul>
                <CommentForm/>
            </div>
            );
        }
        else{
            return(<div></div>);
        }
    }
    const Dishdetail = (props) => {
        const selectedDish = props.dish;
        if(selectedDish!=null){
            return(
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} />
                </div>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
    }
    
    
export default Dishdetail;
