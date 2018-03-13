import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import Image from './Image';
import ImageContainer from './ImageContainer';
import Loading from '../common/Loading';
import TextStepContainer from './TextStepContainer';

class TextStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderMessage = this.renderMessage.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
  }

  componentDidMount() {
    const { step } = this.props;
    const { component, delay, waitAction } = step;
    const isComponentWatingUser = component && waitAction;
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (!isComponentWatingUser && !step.rendered) {
          this.props.triggerNextStep();
        }
      });
    }, delay);
    this.renderMessage();
  }

  renderMessage() {
    const {
      previousValue,
      step,
    } = this.props;
    const { message } = step;

    Promise.resolve(message).then((msg) => {
      console.log(msg);
      this.setState({
        message: msg.replace(/{previousValue}/g, previousValue),
      });
    });
  }

  renderComponent() {
    console.log('In the render componenet');
    const {
      step,
      steps,
      previousStep,
      triggerNextStep,
    } = this.props;
    const { component } = step;

    return React.cloneElement(component, {
      step,
      steps,
      previousStep,
      triggerNextStep,
    });
  }

  render() {
    const {
      step,
      isFirst,
      isLast,
      avatarStyle,
      bubbleStyle,
      hideBotAvatar,
      hideUserAvatar,
    } = this.props;
    const {
      avatar,
      user,
    } = step;

    const showAvatar = user ? !hideUserAvatar : !hideBotAvatar;
    return (
      <TextStepContainer
        className="rsc-ts"
        user={user}
      >
        <ImageContainer
          className="rsc-ts-image-container"
          user={user}
        >
          {
            isFirst && showAvatar &&
            <Image
              className="rsc-ts-image"
              style={avatarStyle}
              showAvatar={showAvatar}
              user={user}
              src={avatar}
              alt="avatar"
            />
          }
        </ImageContainer>
        <Bubble
          className="rsc-ts-bubble"
          style={bubbleStyle}
          user={user}
          showAvatar={showAvatar}
          isFirst={isFirst}
          isLast={isLast}
        >
          {
            this.state.loading &&
            <Loading />
          }
          {!this.state.loading && this.state.message}
          {this.props.step.component && this.renderComponent()}
        </Bubble>
      </TextStepContainer>
    );
  }
}

TextStep.propTypes = {
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  avatarStyle: PropTypes.object.isRequired,
  bubbleStyle: PropTypes.object.isRequired,
  hideBotAvatar: PropTypes.bool.isRequired,
  hideUserAvatar: PropTypes.bool.isRequired,
  previousStep: PropTypes.object,
  previousValue: PropTypes.any,
  steps: PropTypes.object,
};

TextStep.defaultProps = {
  previousStep: {},
  steps: {},
  previousValue: '',
};

export default TextStep;
