import React, { Component } from 'react';
import './WarzoneRegular.scss';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class WarzoneRegular extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Warzone Regular Bruhz</h1>
        <form>
          <label htmlFor='filter'> Personal Warzone Playlist:</label>
          <select name='filter' className='fire-fight-dropdown'>
            <Query query={FIREFIGHT_QUERY} variables={{ player_name }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return <p>loading...</p>
                  if (error) console.log(error)
                  const parsedMapsMetadata = JSON.parse(localStorage.getItem('mapsMetadata')).mapsMetadata
                  return (data.warzoneStats.ScenarioStats.filter(gameVariant => gameVariant.GameBaseVariantId == firefightId).map(id => {
                    return <option id={id.MapId}>
                      {
                        parsedMapsMetadata.find(item => item.id == id.MapId).name
                      }
                    </option>
                  }))
                }
              }
            </Query>
          </select>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer
});

export default connect(mapStateToProps)(WarzoneRegular);