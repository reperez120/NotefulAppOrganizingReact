import React from 'react';
import AddButton from '../AddButton/AddButton';
import ApiContext from '../ApiContext';
import { findNote, findFolder } from '../notes-helpers';
import NotefulError from '../NotefulError';
import './NotePageNav.css'

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className='NotePageNav'>
      <NotefulError>
        <AddButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <br />
          Back
        </AddButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
        </NotefulError>
      </div>
    )
  }
}
