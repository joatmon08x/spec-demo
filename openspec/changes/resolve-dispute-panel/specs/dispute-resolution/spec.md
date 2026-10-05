# Spec Delta

## Purpose

Lets Avery Quinn accept or decline an open dispute from its page, and stores an accepted credit no higher than the invoice's catalog plan price.

## ADDED Requirements

### Requirement: Accept stores a catalog-capped credit
Accepting an open dispute SHALL set its status to ACCEPTED and SHALL store a credit equal to the lesser of the disputed amount and the invoice's catalog plan price. The disputed amount SHALL stay unchanged.

#### Scenario: Accept dsp_1043
- **GIVEN** dsp_1043 claims 40000 cents against a Scale invoice priced at 24900 cents and is NEEDS_REVIEW
- **WHEN** the operator accepts the credit
- **THEN** the stored credit is 24900 cents
- **AND** the status is ACCEPTED
- **AND** the disputed amount remains 40000 cents

#### Scenario: Accept a claim below the plan price
- **GIVEN** an OPEN dispute whose disputed amount is below its invoice's catalog plan price
- **WHEN** the operator accepts the credit
- **THEN** the stored credit equals the disputed amount
- **AND** the status is ACCEPTED

### Requirement: Decline stores no credit
Declining an open dispute SHALL set its status to DECLINED and SHALL NOT change the stored credit or the disputed amount.

#### Scenario: Decline an open dispute
- **GIVEN** an OPEN dispute
- **WHEN** the operator declines it
- **THEN** the status is DECLINED
- **AND** the stored credit is unchanged
- **AND** the disputed amount is unchanged

### Requirement: A decision is final
Accept and Decline SHALL be available only while the status is OPEN or NEEDS_REVIEW. A later accept or decline SHALL be refused and SHALL NOT change the dispute.

#### Scenario: Accept after decline
- **GIVEN** a dispute whose status is DECLINED
- **WHEN** the operator accepts the credit
- **THEN** the request is refused
- **AND** the status stays DECLINED
- **AND** the stored credit is unchanged

### Requirement: Reviewer note is optional
The operator MAY submit a reviewer note with accept or decline. When present, the note SHALL be stored. When absent, any existing note SHALL stay as it was.

#### Scenario: Accept with a note
- **GIVEN** an OPEN dispute
- **WHEN** the operator accepts the credit with a reviewer note
- **THEN** the status is ACCEPTED
- **AND** the stored note is the submitted note

### Requirement: Suggested-credit display stays on the current client
The dispute page SHALL keep showing the suggested credit returned by the current client. Enabling Accept and Decline SHALL NOT change that request.

#### Scenario: dsp_1043 still shows the client result
- **GIVEN** dsp_1043
- **WHEN** the dispute page loads
- **THEN** the suggested-credit figure is the one the current client returns
- **AND** Accept and Decline are enabled
